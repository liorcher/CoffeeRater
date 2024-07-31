import Comment, { commentData } from "../models/comment";

export const getComentsByPostId = async (postId: string) => {
  try {
    return Comment.find({ postId: postId });
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const createNewComment = async (commentData: commentData) => {
  try {
    const newComment = new Comment({
      postId: commentData.postId,
      userId: commentData.userId,
      content: commentData.content,
      rating: commentData.rating,
      commentTime: commentData.commentTime,
    });

    return await newComment.save();
  } catch (error: any) {
    throw new Error(`Error saving comment: ${error.message}`);
  }
};

export const updateComment = async (commentData: commentData) => {
  try {
    const updatedComment = new Comment({
      commentId: commentData.commentId,
      postId: commentData.postId,
      userId: commentData.userId,
      content: commentData.content,
      rating: commentData.rating,
      commentTime: commentData.commentTime,
      updateTime: new Date(),
    });

    return await updatedComment.save();
  } catch (error: any) {
    throw new Error(`Error updating comment: ${error.message}`);
  }
};

export const deleteComment = async (commentData: commentData) => {
  try {
    const deleteComment = new Comment({
      commentId: commentData.commentId,
      postId: commentData.postId,
      userId: commentData.userId,
      content: commentData.content,
      rating: commentData.rating,
      commentTime: commentData.commentTime,
      updateTime: new Date(),
      isDeleted: true,
    });

    return await deleteComment.save();
  } catch (error: any) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};
