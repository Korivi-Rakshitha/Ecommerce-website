import React, { useState, useEffect, useCallback } from 'react';
import StarRating from './StarRating';
import { reviewAPI } from '../services/api';
import './ReviewList.css';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getProductReviews(productId);
      setReviews(response.data.product.reviews || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="review-list">
        <div className="review-list-loading">Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-list">
        <div className="review-list-error">Error loading reviews: {error}</div>
      </div>
    );
  }

  return (
    <div className="review-list">
      <div className="review-list-header">
        <h3>Customer Reviews ({reviews.length})</h3>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <h4>No reviews yet</h4>
          <p>Be the first to review this product!</p>
        </div>
      ) : (
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <div className="review-user">
                  <strong>{review.user?.name || 'Anonymous'}</strong>
                  <div className="review-rating">
                    <StarRating rating={review.rating} readonly />
                    <span className="rating-number">{review.rating}/5</span>
                  </div>
                </div>
                <div className="review-date">
                  {formatDate(review.createdAt)}
                </div>
              </div>

              <div className="review-content">
                <p className="review-comment">{review.comment}</p>
                {review.updatedAt && review.updatedAt !== review.createdAt && (
                  <small className="review-updated">
                    Updated on {formatDate(review.updatedAt)}
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
