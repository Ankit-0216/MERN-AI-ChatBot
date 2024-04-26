import { Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";

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
      message: "Unable to get all users",
      error: error.message,
    });
  }
};

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created Successfully",
      id: user._id.toString(),
    });
  } catch (error) {
    console.log("Error while signing up", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be created",
      error: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Registered",
      });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({
        success: true,
        message: "Incorrect Password",
      });
    }

    console.log(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "User logged in Successfully",
      id: user._id.toString(),
    });
  } catch (error) {
    console.log("Error while logging in", error);
    return res.status(500).json({
      success: false,
      message: "User couldn't be logged in",
      error: error.message,
    });
  }
};
