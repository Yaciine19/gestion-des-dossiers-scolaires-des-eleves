import { Router } from "express";
import { CreateSubject, deleteSubject, getSubjectDetails, getSubjects, updateSubject } from "../controllers/subject.controller.js";

const subjectRouter = Router();

subjectRouter.get('/', getSubjects);

subjectRouter.get('/:id', getSubjectDetails);

subjectRouter.post('/', CreateSubject);

subjectRouter.put('/:id', updateSubject);

subjectRouter.delete('/:id', deleteSubject);

export default subjectRouter;