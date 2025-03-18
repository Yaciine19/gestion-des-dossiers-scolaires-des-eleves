import Class from "../../../models/class.model.js";
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

export const getStudents = async (req, res, next) => {
  try {
    // GET all Users
    const students = await User.find({ role: "Student" });

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await User.findOne({ _id: id, role: "Student" }).select(
      "-password"
    );

    if (!student) {
      const error = new Error("student not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      classId,
      registrationNumber,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      registrationNumber,
      classId: classId || null,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student created successfuly",
      data: newStudent,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      isActive,
      classId,
      registrationNumber,
    } = req.body;

    const student = await User.findOne({ _id: id, role: "Student" });

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (email) student.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
    }
    if (role) student.role = role;
    if (isActive) student.isActive = isActive;
    if (classId) {
      const classData = await Class.findById(classId);
      if (!classData) {
        return res
          .status(404)
          .json({ success: false, message: "Class not found" });
      }
      student.classId = classId;

      if (!classData.students.includes(student._id)) {
        classData.students.push(student._id);
        await classData.save();
      }
    }
    if (registrationNumber) student.registrationNumber = registrationNumber;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await User.findOne({ _id: id, role: "Student" });

    if (!student) return res.status(404).json({ message: "Student not found" });

    await User.findOneAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
