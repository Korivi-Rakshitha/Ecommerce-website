const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'CASH_ON_DELIVERY'],
    default: 'CASH_ON_DELIVERY'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  orderStatus: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentId: {
    type: String,
    default: null
  },
  trackingNumber: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
