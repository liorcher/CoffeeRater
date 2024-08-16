// src/components/Comment.tsx

import React, { useState } from 'react';
import StarRating from './StarRating';
import './Comment.css';

import {CommentProps} from '../models/comment';
import { useNavigate } from 'react-router-dom';


const Comment: React.FC<CommentProps> = ({
  commentId, 
  postId,
  author,
  content,
  avatarUrl,
  time,
  rating,
  photoUrl,
  childComments,
  canEdit,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);
  const [editRating, setEditRating] = useState(rating);
  const navigate = useNavigate();


  const handleEdit = () => {
    onEdit(editText, editRating);
    setIsEditing(false);
  };

  const handleCommentClick = () => {
    navigate(`/posts/${postId}/comments/${commentId}`);
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
        {photoUrl && <img src={photoUrl} alt="Comment" className="comment-photo"  onClick={handleCommentClick}/>}
        {isEditing ? (
          <textarea className='edit-comment' value={editText} onChange={(e) => setEditText(e.target.value)} />
        ) : (
          <p>{content}</p>
        )}
        <div className='comments' onClick={handleCommentClick}>
          {childComments.length} comments
        </div>
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
