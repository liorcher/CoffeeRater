// src/components/Comment.tsx

import React, { useState } from 'react';
import './Comment.css';
import StarRating from './StarRating';

interface CommentProps {
  author: string;
  text: string;
  avatarUrl: string;
  time: string;
  rating: number;
  canEdit: boolean;
  onEdit: (newText: string, newRating: number) => void;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({
  author,
  text,
  avatarUrl,
  time,
  rating,
  canEdit,
  onEdit,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editRating, setEditRating] = useState(rating);

  const handleSave = () => {
    onEdit(editText, editRating);
    setIsEditing(false);
  };

  return (
    <div className="comment">
      <img src={avatarUrl} alt="User Avatar" className="comment-avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{author}</span>
          <span className="comment-time">{time}</span>
        </div>
        {isEditing ? (
          <>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <StarRating rating={editRating} onRatingChange={setEditRating} />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>{text}</p>
            <StarRating rating={rating} readOnly={true} />
            {canEdit && (
              <div className="comment-actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
