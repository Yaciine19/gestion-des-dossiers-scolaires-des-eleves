import { Router } from "express";
import { createUser, deleteUser, getUserDetails, getUsers, updateUser } from "../controllers/user.controller.js";
import {authorize, authorizeRole} from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, authorizeRole("Admin"), getUsers);

userRouter.get("/:id", authorize, getUserDetails);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
