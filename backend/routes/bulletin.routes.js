import { Router } from "express";
import { generateBulletins, getStudentBulletin, updateBulletin } from "../controllers/bulletin.controller.js";

const bulletinRouter = Router();

bulletinRouter.post('/update', updateBulletin);

bulletinRouter.get('/student/:studentId/term/:termNumber', getStudentBulletin);

bulletinRouter.post('/generate', generateBulletins);

export default bulletinRouter;