import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";

export const markAttendance = async (req, res, next) => {
  try {
    const {studentId} = req.params;
    const { status, remark } = req.body;
    const recordedBy = req.user._id;

    const student = await User.findOne({ _id: studentId, role: "Student" });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student Not found" });
    }

    const attendance = new Attendance({
      student: studentId,
      status: status,
      remark: remark || "",
      recordedBy,
    });

    await attendance.save();

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

export const getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await User.findOne({ _id: studentId, role: "Student" });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const attendanceRecords = await Attendance.find({
      student: studentId,
    }).populate("recordedBy", "firstName lastName").sort({ date: -1 });

    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    next(error);
  }
};

export const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found" });
    }

    if (status) attendance.status = status;
    if (reason) attendance.reason = reason;

    await attendance.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Updated attendance successfully",
        data: attendance,
      });
  } catch (error) {
    next(error);
  }
};

export const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findOne({ _id: id });
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found" });
    }

    await Attendance.findOneAndDelete({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Deleted attendance successfully" });
  } catch (error) {
    next(error);
  }
};
