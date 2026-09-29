import express from "express";
import cors from "cors";
import citiesRouter from "./routes/cities.routes";
import { ApiError } from "./errors/api.error";
import { errorHandler } from "./middleware/error.handler";

const app = express();

app.use(cors());

app.use("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", citiesRouter);

app.use((_req, _res, next) => {
  next(new ApiError(404, "NOT_FOUND", "Route not found"));
});

app.use(errorHandler);

export default app;
