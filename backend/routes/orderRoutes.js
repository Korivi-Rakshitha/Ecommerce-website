const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/user/my-orders', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
router.put('/:id/cancel', authMiddleware, cancelOrder);

module.exports = router;
