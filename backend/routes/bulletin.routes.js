import { Router } from "express";
import { calculateAnnualAverage, getStudentAcademicRecord, getStudentBulletin, getStudentsAcademicHistory, updateBulletin } from "../controllers/bulletin.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const bulletinRouter = Router();

bulletinRouter.put('/update', authorize, updateBulletin);

bulletinRouter.get('/:studentId/term/:termNumber', getStudentBulletin);

bulletinRouter.get('/annual/:studentId', calculateAnnualAverage);

// المعلم يعرض السجل الأكاديمي للطلاب الذين يدرسهم
bulletinRouter.get("/teacher/students-history", authorize, getStudentsAcademicHistory);

// الطالب يعرض سجله الأكاديمي الخاص
bulletinRouter.get("/student/academic-record", authorize, getStudentAcademicRecord);

export default bulletinRouter;