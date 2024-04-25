import { Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched Successfully",
      users,
    });
  } catch (error) {
    console.log("Erron in getAllUsers", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get all users.",
      error: error.message,
    });
  }
};
