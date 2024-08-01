import { Request, Response } from "express";
import {
  createNewComment,
  deleteComment,
  getComments,
  updateComment,
} from "../dal/comment.dal";

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
  // const user: any = req.user;
  console.log("hi")
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
  const user: any = req.user;
  const { postId, content, rating, commentTime } = req.body;

  try {
    const newComment = createNewComment({
      postId,
      userId: user.userId,
      content,
      rating,
      commentTime,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).send(`Error retriving user ${user.userId}.`);
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
  const user: any = req.user;
  const { postId, content, rating, commentTime } = req.body;

  try {
    const updatedComment = updateComment({
      postId,
      userId: user.userId,
      content,
      rating,
      commentTime,
    });

    res.json(updatedComment);
  } catch (err) {
    res.status(500).send(`Error retriving user ${user.userId}.`);
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
  const user: any = req.user;
  const { postId, content, rating, commentTime } = req.body;

  try {
    const deletedComment = deleteComment({
      postId,
      userId: user.userId,
      content,
      rating,
      commentTime,
    });

    res.json(deletedComment);
  } catch (err) {
    res.status(500).send(`Error retriving user ${user.userId}.`);
  }
};
