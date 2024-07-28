// src/components/StarRating.tsx

import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, readOnly }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const handleRatingChange = (newRating: number) => {
    if (onRatingChange && !readOnly) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          key={star}
          className={`star ${star<=hoverRating ||star <= rating ? 'filled' : ''}`}
          onClick={() => handleRatingChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
