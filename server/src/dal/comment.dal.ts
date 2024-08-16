import { Comment, commentData, childComment } from "../models/comment";
import User, { IUser, UserBasicData } from "../models/user";

export const getComments = async () => {
  try {
    const comments = await Comment.find({ isDeleted: { $ne: true } });

    const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
      const user = await User.findOne({ userId: comment.userId });
      return {
        ...comment.toObject(),
        avatarUrl: user && user.avatarUrl,
        author: user && user.userName
      };
    }))
    return commentsWithUsers
  } catch (error: any) {
    console.log(error)
    throw new Error();
  }
};

export const createNewChildComment = async (commentId: String, childCommentData: childComment) => {
  const result = await Comment.updateOne(
    { commentId: commentId },
    {
      $push: {
        childComments: childCommentData
      }
    }
  )
  console.log(result)
}
export const createNewComment = async (commentData: commentData) => {
  try {
    const newComment = new Comment({
      postId: commentData.postId,
      userId: commentData.userId,
      content: commentData.content,
      photoUrl: commentData.photoUrl,
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
    const result = await Comment.updateOne(
      { commentId: commentData.commentId },
      {
        $set: {
          content: commentData.content,
          rating: commentData.rating,
          commentTime: commentData.commentTime
        }
      }
    )
    console.log(result)
  } catch (error: any) {
    throw new Error(`Error updating comment: ${error.message}`);
  }
};

export const deleteComment = async (commentData: commentData) => {
  try {
    const result = await Comment.updateOne(
      { commentId: commentData.commentId },
      {
        $set: {
          isDeleted: true
        }
      }
    )
  } catch (error: any) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};
