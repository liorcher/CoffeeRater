// src/components/Post.tsx

import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';
import './Post.css';
import { CreateComment, UpdateComment } from '../models/comment';
import { PostProps } from '../models/post';
import { createComment, updateComment, deleteComment } from '../services/commentsFetchApi';


const Post: React.FC<PostProps> = ({
  id,
  name,
  description,
  price,
  region,
  weight,
  flavorProfile,
  grindOption,
  roastLevel,
  imageUrl,
  comments,
  currentUser,
  currentUserAvatar,
  onCommentChange
}) => {
  const handleAddComment = async (content: string, rating: number, photo: FormData | null) => {
    const newComment: CreateComment = {
      postId: id,
      content,
      photo,
      commentTime: Date.now().toString(),
      rating,
    };
    await createComment(newComment).then(onCommentChange);
  };

  const handleEditComment = async (id: string, newText: string, newRating: number) => {
    const newComment: UpdateComment = {
      commentId: id,
      content: newText,
      rating: newRating,
      commentTime: Date.now().toString()
    }
    await updateComment(newComment).then(onCommentChange)
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id).then(onCommentChange)
  };

  return (
    <div className="post">
      <PostDetails
        id={id}
        name={name}
        description={description} 
        price={price}
        region={region} 
        weight={weight} 
        flavorProfile={flavorProfile} 
        grindOption={grindOption}
        roastLevel={roastLevel} 
        imageUrl={imageUrl} />
      <div className="post-comments">
        {comments.map((comment) => (
          <Comment
            key={comment.commentId}
            commentId={comment.commentId}
            postId={comment.postId}
            author={comment.author}
            content={comment.content}
            avatarUrl={comment.avatarUrl}
            time={new Date(comment.commentTime).toLocaleString()}
            photoUrl={comment.photoUrl}
            rating={comment.rating}
            childComments={comment.childComments}
            canEdit={currentUser === comment.author}
            onEdit={(newText, newRating) => handleEditComment(comment.commentId, newText, newRating)}
            onDelete={() => handleDeleteComment(comment.commentId)}
          />
        ))}
      </div>
      {currentUser && <CommentForm onAddComment={handleAddComment} userAvatar={currentUserAvatar} />}
    </div>
  );
};

export default Post;
