import { Router } from "express";
import postsRoutes from "./post.routes";
import authRoutes from "./auth.routes";


const router = Router();

router.use("/posts", postsRoutes);
router.use("/auth", authRoutes);

export default router;
