import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({role: "Admin"}).select('-classId -subject');

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminDetails = async (req, res, next) => {
  try {
    const {id} = req.params;
    const admin = await User.findOne({_id: id, role: "Admin"}).select("-password -classId -subject");

    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfuly",
      data: newAdmin,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      role
    } = req.body;

    const admin = await User.findOne({_id:id, role: "Admin"});

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;
    if (email) admin.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }
    if (role) admin.role = role;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {

    try {
        const {id} = req.params;

        const admin = await User.findOne({_id: id, role: "Admin"});

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        await User.findOneAndDelete({_id: id, role: "Admin"});

        res.status(200).json({
            success: true,
            message: 'Admin deleted successfully'
        })
    } catch (error) {
        next(error);
    }
}