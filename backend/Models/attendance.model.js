import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", ''],
    default: ''
  },
  remark: {
    type: String,
    default: "",
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // الشخص الذي سجل الغياب
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
