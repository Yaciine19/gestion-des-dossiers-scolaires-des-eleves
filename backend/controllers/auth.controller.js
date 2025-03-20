import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, password, role, registrationNumber } = req.body;

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statuscode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
        registrationNumber: role === "Student" ? registrationNumber : null,
      }
    );

    await newUser.save({session});

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        classId: newUser.classId || null,
        registrationNumber: newUser.registrationNumber || null,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hour
    });

    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfuly",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error(
        "Account not activated. Wait for admin approval."
      );
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        classId: user.classId || null,
        registrationNumber: user.registrationNumber || null,
        isActive: user.isActive,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
