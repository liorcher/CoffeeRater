// src/components/CommentForm.tsx

import React, { useState } from 'react';
import StarRating from './StarRating';
import './CommentForm.css';

interface CommentFormProps {
  onAddComment: (text: string, rating: number) => void;
  userAvatar: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, userAvatar }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text, rating);
      setText('');
      setRating(0);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img src={userAvatar} alt="User Avatar" className="avatar" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <StarRating rating={rating} onRatingChange={setRating} />
      <button type="submit" disabled={!text.trim()}>Post</button>
    </form>
  );
};

export default CommentForm;
