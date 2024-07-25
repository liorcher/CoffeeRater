import { Request, Response } from "express";
import { getWorkoutPlan } from "../dal/workout.dal";

export const getNewWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const newWorkoutPlan = await getWorkoutPlan();
    res.json(newWorkoutPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
