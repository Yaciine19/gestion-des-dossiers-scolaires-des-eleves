// import cookieParser from 'cookie-parser';
import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import classRouter from "./routes/class.routes.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import subjectRouter from "./routes/subject.routes.js";
import eventRouter from "./routes/event.routes.js";
import examRouter from "./routes/exam.routes.js";
import bulletinRoutes from "./routes/bulletin.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/classes", classRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/bulletins", bulletinRoutes);


app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the gestion des dossiers scolaires des eleves");
});

app.listen(PORT, async () => {
  console.log(`the server is start on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
