import { Request, Response } from "express";
import Comment from "../models/comment";
import {
  createNewComment,
  deleteComment,
  getComentsByPostId,
  updateComment,
} from "../dal/comment.dal";

export const getPostComments = async (req: Request, res: Response) => {
  const user: any = req.user;
  const { postId } = req.body;

  try {
    const postComments = await getComentsByPostId(postId);

    res.json(postComments);
  } catch (err) {
    res.status(500).send(`Error retriving user ${user.userId}.`);
  }
};

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
