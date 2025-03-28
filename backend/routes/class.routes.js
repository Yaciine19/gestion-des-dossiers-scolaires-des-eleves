import { Router } from "express";
import { CreateClass, deleteClass, getClassDetails, getClasses, updateClass } from "../controllers/class.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const classRouter = Router();

classRouter.get('/', authorize, getClasses);

classRouter.get('/:id', authorize, getClassDetails);

classRouter.post('/', authorize, CreateClass);

classRouter.put('/:id', authorize, updateClass);

classRouter.delete('/:id', authorize, deleteClass);

export default classRouter;