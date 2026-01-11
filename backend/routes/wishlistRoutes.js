const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlistItems
} = require('../controllers/wishlistController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All wishlist routes require authentication
router.use(authMiddleware);

router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.delete('/clear', clearWishlist);
router.get('/check', checkWishlistItems);

module.exports = router;
