import { Router } from "express";
import { getAll } from "../controllers/post.controller";

const router = Router();

router.get("/all", getAll);

export default router;
