import { Router } from "express";
// import { createUser, deleteUser, getUserDetails, getUsers, updateUser } from "../controllers/user.controller.js";
// import {authorize, authorizeRole} from "../middlewares/auth.middleware.js";
import { createStudent, deleteStudent, getStudentDetails, getStudents, updateStudent } from "../controllers/UserController/Student/student.controller.js";
import { AssginClass, AssignSubject, createTeacher, deleteTeacher, getTeacherDetails, getTeachers, studentsTaughtByTeacher, teacherWithoutSubject, updateTeacher } from "../controllers/UserController/Teacher/teacher.conroller.js";
import { createAdmin, deleteAdmin, getAdminDetails, getAdmins, updateAdmin } from "../controllers/UserController/Admin/admin.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// userRouter.get("/", authorize, authorizeRole("Admin"), getUsers);

// userRouter.get("/:id", authorize, getUserDetails);

// userRouter.post("/", createUser);

// userRouter.put("/:id", updateUser);

// userRouter.delete("/:id", deleteUser);

// Students
userRouter.get('/students', getStudents);

userRouter.get("/students/:id", getStudentDetails);

userRouter.post("/students", createStudent);

userRouter.put("/students/:id", updateStudent);

userRouter.delete("/students/:id", deleteStudent);

// Teachers

userRouter.get('/teachers', getTeachers);

userRouter.get("/teachers/:id", getTeacherDetails);

userRouter.post("/teachers", createTeacher);

userRouter.put("/teachers/:id", updateTeacher);

userRouter.delete("/teachers/:id", deleteTeacher);

userRouter.post("/teachers/assign-subject", AssignSubject);

userRouter.post("/teachers/assign-class", AssginClass);

userRouter.get("/teachers-without-subject", teacherWithoutSubject);

userRouter.get('/teachers/teacher-students', authorize, studentsTaughtByTeacher);

// Admins

userRouter.get('/admins', getAdmins);

userRouter.get("/admins/:id", getAdminDetails);

userRouter.post("/admins", createAdmin);

userRouter.put("/admins/:id", updateAdmin);

userRouter.delete("/admins/:id", deleteAdmin);

export default userRouter;
