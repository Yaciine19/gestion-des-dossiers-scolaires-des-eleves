import { Router } from "express";   
import { deleteAttendance, getStudentAttendance, markAttendance, updateAttendance } from "../controllers/attendance.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const attendanceRouter = Router();

attendanceRouter.post("/", authorize, markAttendance); // Create attendance and remarks
attendanceRouter.get("/student/:studentId", getStudentAttendance); // GET Student' attencdance and remarks
attendanceRouter.put("/:id", updateAttendance);
attendanceRouter.delete("/:id", deleteAttendance);

export default attendanceRouter;