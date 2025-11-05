import express from "express";
import { setupSwagger } from "./swagger.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Router routes
import userRouter from "./routers/user.routes.js";
import labelRouter from "./routers/label.routes.js";
import taskRouter from "./routers/task.routes.js";
import taskLabelRouter from "./routers/taskLabel.route.js";
//router declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/label", labelRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/tasklabel", taskLabelRouter);

// Swagger
setupSwagger(app);

export default app;
