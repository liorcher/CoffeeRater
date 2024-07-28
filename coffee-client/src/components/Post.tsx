// src/components/Post.tsx

import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Post.css';

interface CommentData {
  id: number;
  author: string;
  text: string;
  avatarUrl: string;
  time: string;
  rating: number;
}

interface PostProps {
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
  currentUser: string | null;
  currentUserAvatar: string | null;
}

const Post: React.FC<PostProps> = ({
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

  const handleAddComment = (text: string, rating: number) => {
    const newComment: CommentData = {
      id: postComments.length + 1,
      author: currentUser!,
      text,
      avatarUrl: 'https://via.placeholder.com/40',
      time: 'Just now',
      rating,
    };
    setPostComments([...postComments, newComment]);
  };

  const handleEditComment = (id: number, newText: string, newRating: number) => {
    setPostComments(
      postComments.map((comment) =>
        comment.id === id ? { ...comment, text: newText, rating: newRating } : comment
      )
    );
  };

  const handleDeleteComment = (id: number) => {
    setPostComments(postComments.filter((comment) => comment.id !== id));
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
            rating={comment.rating}
            canEdit={currentUser === comment.author}
            onEdit={(newText, newRating) => handleEditComment(comment.id, newText, newRating)}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
      {currentUser && currentUserAvatar && <CommentForm onAddComment={handleAddComment} userAvatar={currentUserAvatar} />}
    </div>
  );
};

export default Post;
