import { Request, Response } from "express";
import { getAllPosts } from "../dal/post.dal";

export const getAll = async (req: Request, res: Response) => {
  try {
    const costumeMealPlan = await getAllPosts();
    res.json(costumeMealPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
