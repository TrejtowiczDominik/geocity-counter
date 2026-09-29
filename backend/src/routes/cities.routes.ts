import { Router } from "express";
import { getCitiesCount } from "../controllers/cities.controller";

const citiesRouter = Router();

citiesRouter.get("/cities/count", getCitiesCount);

export default citiesRouter;
