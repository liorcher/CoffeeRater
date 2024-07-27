// src/components/CommentForm.tsx

import React, { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommentForm;
