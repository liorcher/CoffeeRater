// src/components/CommentForm.tsx

import React, { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
  onAddChildComment: (text: string) => void;
  userAvatar: string | undefined;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddChildComment, userAvatar }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onAddChildComment(text);
      setText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img src={userAvatar ? userAvatar : "https://via.placeholder.com/40"} alt="User Avatar" className="avatar" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit" disabled={!text.trim()}>Post</button>
    </form>
  );
};

export default CommentForm;
