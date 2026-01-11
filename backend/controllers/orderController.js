const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendOrderConfirmation } = require('../utils/emailService');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    
    const validItems = cart.items.filter(item => item.product);
    
    if (validItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart contains only invalid or deleted products' });
    }
    
    const orderItems = validItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));
    
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      paymentMethod
    });
    
    // Check stock
    for (let item of validItems) {
      const product = await Product.findById(item.product._id);
      if (!product) continue;
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
    }
    
    // Update stock
    for (let item of validItems) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    await order.save();
    
    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], subtotal: 0, tax: 0, total: 0 }
    );

    // Send confirmation email (async, don't await to not block response)
    User.findById(req.user.id).then(user => {
      if (user) {
        sendOrderConfirmation(user, order, validItems);
      }
    }).catch(err => console.error('Error fetching user for email:', err));
    
    res.status(201).json({ success: true, message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.orderStatus = status;
    }
    
    const skip = (page - 1) * limit;
    
    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
        paymentStatus,
        trackingNumber,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.orderStatus !== 'PENDING') {
      return res.status(400).json({ success: false, message: 'Cannot cancel this order' });
    }
    
    // Restore stock
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }
    
    order.orderStatus = 'CANCELLED';
    await order.save();
    
    res.json({ success: true, message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
