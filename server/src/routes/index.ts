import { Router } from "express";
import postsRoutes from "./post.routes";
import usersRoutes from "./user.routes";
import commentsRoutes from "./comment.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/post", postsRoutes);
router.use("/comment", commentsRoutes);
router.use("/user", usersRoutes);
router.use("/auth", authRoutes);

export default router;
