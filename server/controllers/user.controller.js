import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const userData = async (req, res, next) => {
  try {
    const userID = req.id.toString();


    const user = await User.findById(userID).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userID = req.id.toString();
    const updatedData = req.body;

    
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    else{
      delete updatedData.password;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $set: updatedData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
