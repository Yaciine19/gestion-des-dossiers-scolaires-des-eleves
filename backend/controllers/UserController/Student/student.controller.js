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
    const student = await User.findOne({ _id: id, role: "Student" })
      .select("-password -subject")
      .populate("classId", "name level");

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
      isActive,
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
      isActive,
      status: isActive ? "active" : "inactive",
      registrationNumber,
      classId: classId || null,
    });

    await newStudent.save();

    if (classId) {
      await Class.findByIdAndUpdate(
        classId,
        { $push: { students: newStudent._id } },
        { new: true }
      );
    }

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
      // password,
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
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   student.password = await bcrypt.hash(password, salt);
    // }
    if (role) student.role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    student.isActive = isActive;
    student.status = isActive ? "active" : "inactive";
    
    if (registrationNumber) student.registrationNumber = registrationNumber;
    
    if (classId && classId !== student.classId?.toString()) {
      const newClass = await Class.findById(classId);
      if (!newClass) return res.status(404).json({ message: "Class not found" });

      // إزالة الطالب من الصف القديم إذا كان لديه صف
      if (student.classId) {
        await Class.findByIdAndUpdate(student.classId, {
          $pull: { students: student._id },
        });
      }

      // تعيين الصف الجديد للطالب
      student.classId = classId;

      // إضافة الطالب إلى الصف الجديد إذا لم يكن موجودًا
      await Class.findByIdAndUpdate(classId, {
        $addToSet: { students: student._id },
      });
    }

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

    await User.findOneAndDelete({ _id: id, role: "Student" });

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const assignStudentToClass = async (req, res, next) => {
  try {
    const { studentId, classId } = req.body;

    const student = await User.findOne({ _id: studentId, role: "Student" });

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    const classData = await Class.findById(classId);

    if (!classData) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    if (student.classId) {
      return res.status(400).json({
        success: false,
        message: "The student aleardy has a class assigned with him",
      });
    }

    student.classId = classId;

    if (!classData.students.includes(studentId)) {
      classData.students.push(studentId);
    }

    student.save();
    classData.save();

    res.status(200).json({
      success: true,
      message: "Assigned studnet with class successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Activited student account
export const activateStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await User.findOne({ _id: studentId, role: "Student" });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    student.isActive = true;
    student.status = "active";
    await student.save();

    res.json({
      success: true,
      message: "Student account activated successfully",
    });
  } catch (error) {
    next(error);
  }
};
