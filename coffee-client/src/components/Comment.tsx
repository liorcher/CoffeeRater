// src/components/Comment.tsx

import React, { useState } from 'react';
import StarRating from './StarRating';
import './Comment.css';

interface CommentProps {
  author: string;
  content: string;
  avatarUrl: string;
  time: string;
  rating: number;
  photoUrl: string | null;
  canEdit: boolean;
  onEdit: (newText: string, newRating: number) => void;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({
  author,
  content,
  avatarUrl,
  time,
  rating,
  photoUrl,
  canEdit,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);
  const [editRating, setEditRating] = useState(rating);

  const handleEdit = () => {
    onEdit(editText, editRating);
    setIsEditing(false);
  };

  return (
    <div className="comment">
      <img src={avatarUrl} alt="Author Avatar" className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{author}</span>
          <span className="comment-time">{time}</span>
          <StarRating rating={isEditing ? editRating : rating} onRatingChange={setEditRating} readOnly={!isEditing} />
        </div>
        {photoUrl && <img src={photoUrl} alt="Comment" className="comment-photo" />}
        {isEditing ? (
          <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
        ) : (
          <p>{content}</p>
        )}
        {canEdit && (
          <div className="comment-actions">
            {isEditing ? (
              <>
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
