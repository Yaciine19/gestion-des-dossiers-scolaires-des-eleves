import { Router } from "express";
// import {authorize, authorizeRole} from "../middlewares/auth.middleware.js";
import {
  activateStudent,
  assignStudentToClass,
  createStudent,
  deleteStudent,
  getStudentDetails,
  getStudents,
  updateStudent,
} from "../controllers/UserController/Student/student.controller.js";
import {
  AssginClass,
  AssignSubject,
  createTeacher,
  deleteTeacher,
  getStudentsByTeacher,
  getTeacherDetails,
  getTeachers,
  studentsTaughtByTeacher,
  teacherWithoutSubject,
  updateTeacher,
} from "../controllers/UserController/Teacher/teacher.conroller.js";
import {
  createAdmin,
  deleteAdmin,
  getAdminDetails,
  getAdmins,
  updateAdmin,
} from "../controllers/UserController/Admin/admin.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { deleteUser, getUser, getUsers } from "../controllers/UserController/users.controller.js";

const userRouter = Router();

// GET all Users
userRouter.get("/", authorize, getUsers);

userRouter.get("/user", authorize, getUser);

userRouter.delete('/:id',authorize, deleteUser);

// Students
userRouter.get("/students", authorize, getStudents);

userRouter.get("/students/:id", authorize, getStudentDetails);

userRouter.post("/students", authorize, createStudent);

userRouter.put("/students/:id", authorize, updateStudent);

userRouter.delete("/students/:id", authorize, deleteStudent);

userRouter.post("/students/assign-class", authorize, assignStudentToClass);

userRouter.put("/students/activate/:studentId", authorize, activateStudent);

// Teachers

userRouter.get("/teachers", authorize, getTeachers);

userRouter.get("/teachers/:id", authorize, getTeacherDetails);

userRouter.post("/teachers", authorize, createTeacher);

userRouter.put("/teachers/:id", authorize, updateTeacher);

userRouter.delete("/teachers/:id", authorize, deleteTeacher);

userRouter.post("/teachers/assign-subject", authorize, AssignSubject);

userRouter.post("/teachers/assign-class", authorize, AssginClass);

userRouter.get("/teachers-without-subject", authorize, teacherWithoutSubject);

// GET information about teacher and his students
userRouter.get(
  "/teacher-students",
  authorize,
  studentsTaughtByTeacher
);

userRouter.get("/teachers/students/:id", authorize, getStudentsByTeacher);

// Admins

userRouter.get("/admins", authorize, getAdmins);

userRouter.get("/admins/:id", authorize, getAdminDetails);

userRouter.post("/admins", authorize, createAdmin);

userRouter.put("/admins/:id", authorize, updateAdmin);

userRouter.delete("/admins/:id", authorize, deleteAdmin);

export default userRouter;
