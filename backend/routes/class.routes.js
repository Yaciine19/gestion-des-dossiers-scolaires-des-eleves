import { Router } from "express";
import { CreateClass, deleteClass, getClassDetails, getClasses, updateClass } from "../controllers/class.controller.js";

const classRouter = Router();

classRouter.get('/', getClasses);

classRouter.get('/:id', getClassDetails);

classRouter.post('/', CreateClass);

classRouter.put('/:id', updateClass);

classRouter.delete('/:id', deleteClass);

export default classRouter;