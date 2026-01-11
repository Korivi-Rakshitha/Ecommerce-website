import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={`star-rating ${readonly ? 'readonly' : ''}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
