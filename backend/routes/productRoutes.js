const express = require('express');
const {
  getAllProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview
} = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.post('/:id/reviews', authMiddleware, addReview);

module.exports = router;
