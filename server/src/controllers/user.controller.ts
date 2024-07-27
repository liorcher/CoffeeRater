import { Request, Response } from "express";
import { getAllPosts } from "../dal/post.dal";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allPosts = await getAllPosts();
    res.json(allPosts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const craeteNewPost = async (req: Request, res: Response) => {
  try {
    const allPosts = await getAllPosts();
    res.json(allPosts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
