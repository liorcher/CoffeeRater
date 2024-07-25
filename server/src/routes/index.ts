import { Router } from "express";
import postsRoutes from "./post.routes";

const router = Router();

router.use("/posts", postsRoutes);

export default router;
