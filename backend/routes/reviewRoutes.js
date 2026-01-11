const express = require('express');
const { body } = require('express-validator');
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation rules
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('comment')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
];

// Get reviews for a product
router.get('/product/:productId', getProductReviews);

// Create a review (protected)
router.post('/product/:productId', protect, reviewValidation, createReview);

// Update a review (protected)
router.put('/:reviewId', protect, reviewValidation, updateReview);

// Delete a review (protected)
router.delete('/:reviewId', protect, deleteReview);

// Get user's reviews (protected)
router.get('/user/my-reviews', protect, getUserReviews);

module.exports = router;
