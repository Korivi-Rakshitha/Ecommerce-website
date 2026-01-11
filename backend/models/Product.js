const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [{
    type: String,
      default: [
        'https://images.unsplash.com/photo-1526178613296-2d4f0d4f6f2d?w=500&h=500&fit=crop'
      ]
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [reviewSchema],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
