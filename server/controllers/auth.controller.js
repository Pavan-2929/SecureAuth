import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const isUserExist = await User.findOne({email})
    if(isUserExist){
      return next(errorHandler(400, "User already exist"))
    }

    if (!username || !email || !password || !confirmPassword) {
      return next(errorHandler(400, "Enter all details"));
    }

    if (password !== confirmPassword) {
      return next(errorHandler(400, "Enter same password"));
    }

    const newUser = await User.create({ username, email, password });
    const token = await newUser.generateToken();
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookie("token", token, {
        expires: expiryTime,
        sameSite: "None",
        secure: true,
      });

    const userWithOutPassword = await User.findById(newUser._id).select(
      "-password"
    );

    res.status(200).json(userWithOutPassword);
  } catch (error) {
    console.log("error in registraion", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validEmail = await User.findOne({ email });
    if (!validEmail) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await validEmail.comparePassword(password);
    if (!validPassword) {
      return next(errorHandler(400, "Enter valid password"));
    }

    const token = await validEmail.generateToken();
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookie("token", token, {
        expires: expiryTime,
        sameSite: "None",
        secure: true,
      });
    const userWithOutPassword = await User.findById(validEmail._id).select(
      "-password"
    );

    res.status(200).json(userWithOutPassword);
  } catch (error) {
    console.log("error in login", error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const { password, ...rest } = user._doc;

      const token = await user.generateToken();
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookie("token", token, {
        expires: expiryTime,
        sameSite: "None",
        secure: true,
      });

      res.status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: generatedPassword,
        profilePicture: req.body.profilePicture,
      });

      const token = await newUser.generateToken();
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookie("token", token, {
        expires: expiryTime,
        sameSite: "None",
        secure: true,
      });

      const userWithOutPassword = await User.findById(newUser._id).select(
        "-password"
      );

      res.status(200).json(userWithOutPassword);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.clearCookie("token");
    res.status(200).json({ message: "User logout" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      next(errorHandler(404, "User not found"));
    }
    await res.clearCookie("token");
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
