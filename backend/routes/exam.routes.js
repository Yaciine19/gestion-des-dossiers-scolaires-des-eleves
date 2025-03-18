import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  CreateExam,
  deleteExam,
  getExamDetails,
  getExams,
  updateExam,
} from "../controllers/exam.controller.js";

const examRouter = Router();

examRouter.get("/", getExams);

examRouter.get("/:id", getExamDetails);

examRouter.post("/", authorize, CreateExam);

examRouter.put("/:id", updateExam);

examRouter.delete("/:id", deleteExam);

export default examRouter;
