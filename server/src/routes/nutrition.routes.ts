import { Router } from "express";
import { getNutritionMealPlan } from "../controllers/nutrituon.controller";

const router = Router();

router.get("/plan", getNutritionMealPlan);

export default router;
