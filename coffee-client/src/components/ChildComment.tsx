// src/components/Comment.tsx

import React, { useState } from 'react';
import './Comment.css';
import {ChildCommentProps} from '../models/childComment';


const Comment: React.FC<ChildCommentProps> = ({
  author,
  content,
  avatarUrl,
  commentTime,
  canEdit,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);


  const handleEdit = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  return (
    <div className="comment">
      <img src={avatarUrl} alt="Author Avatar" className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{author}</span>
          <span className="comment-time">{commentTime}</span>
        </div>
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
