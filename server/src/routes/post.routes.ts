import { Router } from "express";
import { craeteNewPost, getAllPosts } from "../controllers/post.controller";

const router = Router();

router.get("/all", getAllPosts);
router.post("/create", craeteNewPost);

export default router;
