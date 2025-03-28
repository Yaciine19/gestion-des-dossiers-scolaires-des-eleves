import { Router } from "express";
import { CreateSubject, deleteSubject, getSubjectDetails, getSubjects, updateSubject } from "../controllers/subject.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const subjectRouter = Router();

subjectRouter.get('/', authorize, getSubjects);

subjectRouter.get('/:id', authorize, getSubjectDetails);

subjectRouter.post('/', authorize, CreateSubject);

subjectRouter.put('/:id', authorize, updateSubject);

subjectRouter.delete('/:id', authorize, deleteSubject);

export default subjectRouter;