// src/components/CommentForm.tsx

import React, { useState } from 'react';
import StarRating from './StarRating';
import './CommentForm.css';
import { FaCamera } from 'react-icons/fa';

interface CommentFormProps {
  onAddComment: (text: string, rating: number, photoUrl: string) => void;
  userAvatar: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, userAvatar }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || photoUrl) {
      onAddComment(text, rating, photoUrl);
      setText('');
      setRating(0);
      setPhotoUrl('');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img src={userAvatar} alt="User Avatar" className="avatar" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        required={!photoUrl}
      />
      <StarRating rating={rating} onRatingChange={setRating} />
      <label className="photo-upload">
        <FaCamera />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </label>
      <button type="submit" disabled={!text.trim() && !photoUrl}>Post</button>
    </form>
  );
};

export default CommentForm;
