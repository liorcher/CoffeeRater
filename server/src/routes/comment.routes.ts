import { Router } from "express";
import {
  createComment,
  deleteCommentRoute,
  getPostComments,
  updateCommentRoute,
  createChildCommentRoute, 
  deleteChildCommentRoute, 
  updateChildCommentRoute
} from "../controllers/comment.controller";

const router = Router();

router.get("/", getPostComments);
router.post("/create", createComment);
router.post("/:commentId/createChild", createChildCommentRoute);
router.put("/:commentId/updateChild", updateChildCommentRoute);
router.delete("/:commentId/deleteChild/:childCommentId", deleteChildCommentRoute);
router.put("/update", updateCommentRoute);
router.delete("/delete/:commentId", deleteCommentRoute);

export default router;
