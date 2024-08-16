import { Request, Response } from "express";
import {
  createNewComment,
  deleteComment,
  getComments,
  updateComment,
  createNewChildComment,
  updateChildComment,
  deleteChildComment
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
 * /:commentId/createChild:
 *   post:
 *     summary: Create a new child comment
 *     description: Creates a new child comment for a given parent comment.
 *     tags: [Comment]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the parent comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               commentTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Successfully created a child comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 childCommentId:
 *                   type: string
 *                   format: uuid
 *                 content:
 *                   type: string
 *                 commentTime:
 *                   type: string
 *                   format: date-time
 *                 parentId:
 *                   type: string
 *                   format: uuid
 *       500:
 *         description: Error creating child comment.
 */
export const createChildCommentRoute = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { commentId } = req.params;
  const { content, commentTime } = req.body;
  try {
    const payload: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const newComment = createNewChildComment(commentId, {
      userId: payload.user.userId,
      content,
      commentTime,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).send(`Error creating comment.`);
  }
};

/** 
 *  @swagger
 * /:commentId/updateChild:
 *    put:
*      summary: Update a child comment
*      description: Updates a specific child comment of a parent comment.
*      tags: [Comment]
*      parameters:
*        - name: commentId
*          in: path
*          required: true
*          schema:
*            type: string
*            format: uuid
*          description: The ID of the parent comment
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                childCommentId:
*                  type: string
*                  format: uuid
*                content:
*                  type: string
*                commentTime:
*                  type: string
*                  format: date-time
*      responses:
*        200:
*          description: Successfully updated the child comment.
*        500:
*          description: Error updating child comment.
*/
export const updateChildCommentRoute = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { commentId } = req.params;
  const { childCommentId, content, commentTime } = req.body;
  try {
    const payload: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const newComment = updateChildComment(commentId, {
      userId: payload.user.userId,
      childCommentId,
      content,
      commentTime,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).send(`Error updating child comment.`);
  }
};

/**
 * @swagger
 * /:commentId/deleteChild/:childCommentId:
 *  delete:
 *    summary: Delete a child comment
 *    description: Deletes a specific child comment from a parent comment.
 *    tags: [Comment]
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The ID of the parent comment
 *      - name: childId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The ID of the child comment to delete
 *    responses:
 *      200:
 *        description: Successfully deleted the child comment.
 *      500:
 *        description: Error deleting child comment.
 */
export const deleteChildCommentRoute = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { commentId, childCommentId } = req.params;
  try {
    const payload: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const deletedComment = deleteChildComment(commentId, childCommentId);
    res.json(deletedComment);
  } catch (err) {
    res.status(500).send(`Error deleting child comment.`);
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
