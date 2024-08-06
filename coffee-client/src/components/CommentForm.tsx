// src/components/CommentForm.tsx

import React, { useState } from 'react';
import StarRating from './StarRating';
import './CommentForm.css';
import { FaCamera } from 'react-icons/fa';

interface CommentFormProps {
  onAddComment: (text: string, rating: number, photo: FormData) => void;
  userAvatar: string | undefined;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, userAvatar }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      return;
    }

    const photoFormData = new FormData();
    photoFormData.append('image', photo);
    if (text.trim()) {
      onAddComment(text, rating, photoFormData);
      setText('');
      setRating(0);
      setPhoto(null);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img src={userAvatar ? userAvatar : "https://via.placeholder.com/40"} alt="User Avatar" className="avatar" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        required={!photo}
      />
      <StarRating rating={rating} onRatingChange={setRating} />
      <label className="photo-upload">
        <FaCamera />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </label>
      <button type="submit" disabled={!text.trim() && !photo}>Post</button>
    </form>
  );
};

export default CommentForm;
