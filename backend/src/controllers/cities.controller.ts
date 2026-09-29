import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error";
import { countCitiesByPrefix } from "../services/cities.service";
import { validatePrefix } from "../validation/prefix.validation";

export const getCitiesCount = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const validation = validatePrefix(req.query.prefix);

  if (!validation.ok) {
    next(new ApiError(400, "INVALID_PREFIX", validation.error));

    return;
  }

  try {
    const result = await countCitiesByPrefix(validation.prefix);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
