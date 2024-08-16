import { Comment, commentData, childComment } from "../models/comment";
import User from "../models/user";

export const getComments = async () => {
  try {
    const comments = await Comment.find({ isDeleted: { $ne: true } });

    const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
      const user = await User.findOne({ userId: comment.userId });
      const childComments = comment.childComments ? await getChildCommentsWithUser(comment.childComments) : []
      return {
        ...comment.toObject(),
        childComments,
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

export const getChildCommentsWithUser = async (childComments: childComment[]) => {
  try {
      const commentsWithUsers = await Promise.all(childComments.map(async (child) => {
        const user = await User.findOne({ userId: child.userId });

        return {
          content: child.content,
          commentTime: child.commentTime,
          childCommentId: child.childCommentId,
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

export const deleteChildComment  = async (commentId: string, childCommentId: string) => {
  const result = await Comment.updateOne(
    { commentId: commentId },
    { $pull: { childComments: { childCommentId: childCommentId } } }
  );

  if (result.modifiedCount === 0) {
    throw new Error('Child comment not found or not deleted');
  }

  return result;
}

export const createNewChildComment = async (commentId: String, childCommentData: childComment) => {
  const result = await Comment.updateOne(
    { commentId: commentId },
    {
      $push: {
        childComments: childCommentData
      }
    }
  )
}

export const updateChildComment = async (commentId: String, childCommentData: childComment) => {
  const result = await Comment.updateOne(
    { commentId: commentId, "childComments.childCommentId": childCommentData.childCommentId },
    {
      $set: {
        'childComments.$.content': childCommentData.content,
        'childComments.$.commentTime': childCommentData.commentTime
      },
    }
  )
  return result
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
      childComments: []
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
    return result
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
