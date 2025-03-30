import { Router } from "express";
import {
  deleteAttendance,
  getStudentAttendance,
  markAttendance,
  updateAttendance,
} from "../controllers/attendance.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const attendanceRouter = Router();

attendanceRouter.post("/:studentId", authorize, markAttendance); // Create attendance and remarks

attendanceRouter.get("/student/:studentId", authorize, getStudentAttendance); // GET Student' attencdance and remarks

attendanceRouter.put("/:id", authorize, updateAttendance);

attendanceRouter.delete("/:id", authorize, deleteAttendance);

export default attendanceRouter;
