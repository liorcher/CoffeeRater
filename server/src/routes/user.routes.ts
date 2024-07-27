import { Router } from "express";
import { getAll } from "../controllers/post.controller";

const router = Router();

router.get("/id", getAll);
router.post("/", getAll);

export default router;
