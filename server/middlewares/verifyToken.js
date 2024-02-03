import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return next(errorHandler(401, "Cookie not found"));
  }

  const token = cookies.split("=")[1];
  if (!token) {
    return next(errorHandler(401, "Token not found"));
  }
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(isVerified.id).select("-password");

    if (user) {
      req.id = user._id;
      next();
    } else {
      return next(errorHandler(404, "User not found"));
    }
  } catch (error) {
    return next(errorHandler(401, "Invalid token"));
  }
};

export default verifyToken;
