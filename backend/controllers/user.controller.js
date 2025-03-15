import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    // GET all Users
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    // GET user details without password
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      classId,
      subjectes,
      registrationNumber,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      registrationNumber: role === "Student" ? registrationNumber : null,
      classId: role === "Student" ? classId : null,
      subjectes: role === "Teacher" ? subjectes : null,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfuly",
      data: newUser,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      classId,
      subjectes,
      registrationNumber,
    } = req.body;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (role) user.role = role;
    if (classId) user.classId = classId;
    if (subjectes) user.subjectes = subjectes;
    if (registrationNumber) user.registrationNumber = registrationNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {

    try {
        const {id} = req.params;

        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        next(error);
    }
}