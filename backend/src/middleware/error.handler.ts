import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    if (err.status >= 500) {
      console.error(err);
    }

    res
      .status(err.status)
      .json({ error: { code: err.code, message: err.message } });

    return;
  }

  console.error(err);

  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
};
