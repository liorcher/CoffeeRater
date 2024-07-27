import { Router } from "express";
import { createComment, deleteComment, getPostComments, updateComment } from "../controllers/comment.controller";

const router = Router();

router.get('/', getPostComments)
router.post('/create', createComment)
router.put('/update', updateComment)
router.delete('/delete', deleteComment)

export default router;
