// src/components/Post.tsx

import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Post.css';
import { CreateComment, UpdateComment } from '../models/comment';
import { createComment, updateComment, deleteComment } from '../services/commentsFetchApi';

interface CommentData {
  id: string;
  author: string;
  text: string;
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
  currentUserAvatar
}) => {
  const [postComments, setPostComments] = useState(comments);

  const handleAddComment = (content: string, rating: number, photoUrl: string | null) => {
    const newComment: CreateComment = {
      postId: id,
      content,
      photoUrl,
      commentTime: Date.now().toString(),
      rating,
    };
    createComment(newComment);
  };

  const handleEditComment = (id: string, newText: string, newRating: number) => {
    const newComment: UpdateComment = {
      commentId: id,
      content: newText,
      rating: newRating,
      time: Date.now().toString()
    }
    updateComment(newComment)
  };

  const handleDeleteComment = (id: string) => {
    deleteComment(id)
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
            key={comment.id}
            author={comment.author}
            text={comment.text}
            avatarUrl={comment.avatarUrl}
            time={comment.time}
            photoUrl={comment.photoUrl}
            rating={comment.rating}
            canEdit={currentUser === comment.author}
            onEdit={(newText, newRating) => handleEditComment(comment.id, newText, newRating)}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
      {currentUser && <CommentForm onAddComment={handleAddComment} userAvatar={currentUserAvatar} />}
    </div>
  );
};

export default Post;
