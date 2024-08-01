import { Router } from "express";
import {
  createComment,
  deleteCommentRoute,
  getPostComments,
  updateCommentRoute,
} from "../controllers/comment.controller";

const router = Router();

router.get("/", getPostComments);
router.post("/create", createComment);
router.put("/update", updateCommentRoute);
router.delete("/delete", deleteCommentRoute);

export default router;
