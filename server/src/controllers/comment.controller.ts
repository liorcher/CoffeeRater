import { Request, Response } from "express";
import {
  createNewComment,
  deleteComment,
  getComments,
  updateComment,
} from "../dal/comment.dal";
import jwt from "jsonwebtoken";


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments for a post
 *     description: Retrieves comments for a given post.
 *     tags: [Comment]
 *     parameters:
 *       - in: body
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve comments for.
 *     responses:
 *       200:
 *         description: Successfully retrieved comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   commentId:
 *                     type: string
 *                   postId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   content:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   commentTime:
 *                     type: string
 *                   updateTime:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 *       500:
 *         description: Error retrieving comments.
 */
export const getPostComments = async (req: Request, res: Response) => {

  try {
    const postComments = await getComments();

    res.json(postComments);
  } catch (err) {
    res.status(500).send(`Error retriving post Comments.`);
  }
};

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Creates a new comment for a given post.
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *               commentTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created a comment.
 *       500:
 *         description: Error creating comment.
 */
export const createComment = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { postId, content, rating, commentTime, photo } = req.body;
  try {
    const payload: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const newComment = createNewComment({
      postId,
      userId: payload.user.userId,
      content,
      photoUrl: photo,
      rating,
      commentTime,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).send(`Error creating comment.`);
  }
};

/**
 * @swagger
 * /comments:
 *   put:
 *     summary: Update an existing comment
 *     description: Updates an existing comment for a given post.
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *               commentTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the comment.
 *       500:
 *         description: Error updating comment.
 */
export const updateCommentRoute = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { commentId, content, rating, commentTime } = req.body;
  try {
    const payload: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ); 
    const updatedComment = updateComment({
      commentId,
      userId: payload.user.userId,
      content,
      rating,
      commentTime,
    });

    res.json(updatedComment);
  } catch (err) {
    res.status(500).send(`Error updating comment.`);
  }
};

/**
 * @swagger
 * /comments:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment for a given post.
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *               commentTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the comment.
 *       500:
 *         description: Error deleting comment.
 */
export const deleteCommentRoute = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  try {
    const deletedComment = deleteComment({
      commentId
    });

    res.json(deletedComment);
  } catch (err) {
    res.status(500).send(`Error deleteing comment`);
  }
};
