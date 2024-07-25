import { Router } from "express";
import { getNewWorkoutPlan } from "../controllers/workout.controller";

const router = Router();

router.get("/plan", getNewWorkoutPlan);

export default router;