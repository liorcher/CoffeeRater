// src/components/Post.tsx

import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Post.css';

interface Comment {
  id: number;
  text: string;
  author: string;
  time: string;
  avatarUrl: string;
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
  comments: Comment[];
  time: string;
  author: string;
  avatarUrl: string;
  currentUser: string | null;
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
  time,
  author,
  avatarUrl,
  currentUser
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  const handleAddComment = (text: string) => {
    // Handle adding a comment
  };

  const handleEditComment = (id: number, text: string) => {
    // Handle editing a comment
    setEditingCommentId(null);
  };

  const handleDeleteComment = (id: number) => {
    // Handle deleting a comment
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-text">
          <h1>{name}</h1>
        </div>
      </div>
      <img src={imageUrl} alt={name} className="post-image" />
      <div className="post-content">
        <p>{description}</p>
        <p><strong>Price:</strong> ${price.toFixed(2)}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Weight:</strong> {weight}g</p>
        <p><strong>Flavor Profile:</strong> {flavorProfile.join(', ')}</p>
        <p><strong>Grind Options:</strong> {grindOption.join(', ')}</p>
        <p><strong>Roast Level:</strong> {roastLevel}</p>
      </div>
      <div className="post-comments">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            text={comment.text}
            author={comment.author}
            time={comment.time}
            avatarUrl={comment.avatarUrl}
            isCurrentUser={comment.author === currentUser}
            onEdit={id => setEditingCommentId(id)}
            onDelete={id => handleDeleteComment(id)}
          />
        ))}
        <CommentForm onSubmit={text => handleAddComment(text)} />
      </div>
    </div>
  );
};

export default Post;
