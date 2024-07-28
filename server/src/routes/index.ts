import { Router } from "express";
import usersRoutes from "./user.routes";
import commentsRoutes from "./comment.routes";
import authRoutes from "./auth.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

router.use("/comment", commentsRoutes);
router.use("/user", usersRoutes);
router.use("/auth", authRoutes);
router.use("/images", uploadRoutes);

export default router;
