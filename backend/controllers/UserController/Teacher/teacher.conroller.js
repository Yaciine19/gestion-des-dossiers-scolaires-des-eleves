import Class from "../../../models/class.model.js";
import Subject from "../../../models/subject.model.js";
import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await User.find({ role: "Teacher" });
    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacherDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await User.findOne({ _id: id, role: "Teacher" })
      .select("-password")
      .populate("subject", "name").populate("classId", "name level");

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, classId, subject } =
      req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      classId: classId || null,
      subject: subject || null,
    });

    await newTeacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher created successfuly",
      data: newTeacher,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, role, classId, subject } =
      req.body;

    const teacher = await User.findOne({ _id: id, role: "Teacher" });

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    if (firstName) teacher.firstName = firstName;
    if (lastName) teacher.lastName = lastName;
    if (email) teacher.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
    }
    if (role) teacher.role = role;
    if (classId) teacher.classId = classId;
    if (subject) teacher.subject = subject;

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await User.findOne({ _id: id, role: "Teacher" });

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    await User.findOneAndDelete({ _id: id, role: "Teacher" });

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Assign subject to a specific teacher
export const AssignSubject = async (req, res, next) => {
  try {
    const { teacherId, subjectId } = req.body;

    const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });

    if (!teacher || teacher.role !== "Teacher") {
      const error = new Error("Teacher Not Found");
      error.statusCode = 404;
      throw error;
    }

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      const error = new Error("Subject Not Found");
      error.statusCode = 404;
      throw error;
    }

    if (teacher.subject) {
      return res.status(400).json({
        success: false,
        message: "The teacher aleardy has a subject assigned with him",
      });
    }

    teacher.subject = subjectId;

    if (!subject.teachers.includes(teacherId)) {
      subject.teachers.push(teacherId);
    }

    teacher.save();
    subject.save();

    res.status(200).json({
      success: true,
      message: "Assigned teacher with subject successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET Teachers that they doesn't have a assigned subject
export const teacherWithoutSubject = async (req, res, next) => {
  try {
    const teachers = await User.find({ role: "Teacher", subject: null }).select(
      "firstName lastName"
    );
    res.json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
};

// GET students taught by the teacher
export const studentsTaughtByTeacher = async (req, res, next) => {
  try {
    const teacher = await User.findById(req.user.id);

    if (!teacher || teacher.role !== "Teacher") {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    if (!teacher.classId) {
      return res.status(400).json({
        success: false,
        message: "No class is assigned to this teacher.",
      });
    }

    const classData = await Class.findById(teacher.classId).populate(
      "students"
    );

    if (!classData) {
      return res
        .status(404)
        .json({ success: false, message: "Class not Found" });
    }

    res.json({ success: true, students: classData.students });
  } catch (error) {
    next(error);
  }
};

// Assign class to teacher
export const AssginClass = async (req, res, next) => {
  try {
    const { teacherId, classId } = req.body;

    const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    const classData = await Class.findById(classId);

    if (!classData) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    if (teacher.classId) {
       return res
        .status(400)
        .json({ message: "The teacher aleardy has a class assigned with him" });
    }

    teacher.classId = classId;

    if (!classData.teachers.includes(teacherId)) {
      classData.teachers.push(teacherId);
    }

    teacher.save();
    classData.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Assigned teacher with subject successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const getStudentsByTeacher = async (req, res, next) => {
  try {
    const {id} = req.params;

    const teacher = await User.findOne({_id: id, role: "Teacher"});

    if (!teacher || teacher.role !== "Teacher") {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const students = await User.find({ classId: teacher.classId, role: "Student" });

    res.status(200).json({
      success: true,
      data: students, 
    });

  } catch (error) {
    next(error);
  }
}