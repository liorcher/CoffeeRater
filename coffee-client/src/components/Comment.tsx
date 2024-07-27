// src/components/Comment.tsx

import React from 'react';
import './Comment.css';

interface CommentProps {
  id: number;
  text: string;
  author: string;
  time: string;
  avatarUrl: string;
  isCurrentUser: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  text,
  author,
  time,
  avatarUrl,
  isCurrentUser,
  onEdit,
  onDelete
}) => {
  return (
    <div className="comment">
      <img src={avatarUrl} alt={author} className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{author}</span>
          <span className="comment-time">{time}</span>
        </div>
        <p className="comment-text">{text}</p>
        {isCurrentUser && (
          <div className="comment-actions">
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
