import React, { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment: comment.trim() })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      // Reset form
      setRating(0);
      setComment('');

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating *</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Review *</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others about your experience"
            rows="4"
            maxLength="500"
            required
          />
          <small>{comment.length}/500 characters</small>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => {
            setRating(0);
            setComment('');
            setError('');
          }}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
