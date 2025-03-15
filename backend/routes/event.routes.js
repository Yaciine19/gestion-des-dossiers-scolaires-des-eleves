import { Router } from "express";
import {
  CreateEvent,
  deleteEvent,
  getEventDetails,
  getEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/", getEvents);

eventRouter.get("/:id", getEventDetails);

eventRouter.post("/", authorize, CreateEvent);

eventRouter.put("/:id", updateEvent);

eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
