// src/components/Post.tsx

import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Post.css';
import { CreateComment, UpdateComment } from '../models/comment';
import { createComment, updateComment, deleteComment } from '../services/commentsFetchApi';

interface CommentData {
  commentId: string;
  author: string;
  content: string;
  avatarUrl: string;
  time: string;
  rating: number;
  photoUrl: string | null;
}

interface PostProps {
  id: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavorProfile: string[];
  grindOption: string[];
  roastLevel: number;
  imageUrl: string;
  comments: CommentData[];
  currentUser: string | undefined;
  currentUserAvatar: string | undefined;
  onCommentChange: any;
}

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
  const [postComments, setPostComments] = useState(comments);

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
      <img src={imageUrl} alt="Post" className="post-image" />
      <div className="post-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Weight:</strong> {weight}g
        </p>
        <p>
          <strong>Flavor Profile:</strong> {flavorProfile.join(', ')}
        </p>
        <p>
          <strong>Grind Options:</strong> {grindOption.join(', ')}
        </p>
        <p>
          <strong>Roast Level:</strong> {roastLevel}
        </p>
      </div>
      <div className="post-comments">
        {postComments.map((comment) => (
          <Comment
            key={comment.commentId}
            author={comment.author}
            content={comment.content}
            avatarUrl={comment.avatarUrl}
            time={comment.time}
            photoUrl={comment.photoUrl}
            rating={comment.rating}
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
