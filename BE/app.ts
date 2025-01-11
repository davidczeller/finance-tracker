import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { AppDataSource } from "./data-source";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth/token.auth";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_HOST);
const app = express();

// Update CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://frontend:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(error => console.log("Error during Data Source initialization:", error));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/auth", authRouter);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;
