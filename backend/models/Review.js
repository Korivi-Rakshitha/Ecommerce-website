const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Update product's average rating when review is saved
reviewSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  const reviews = await mongoose.model('Review').find({ product: this.product });
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(this.product, {
    averageRating: Math.round(averageRating * 10) / 10,
    reviewCount: reviews.length
  });
});

// Update product's average rating when review is removed
reviewSchema.post('remove', async function() {
  const Product = mongoose.model('Product');
  const reviews = await mongoose.model('Review').find({ product: this.product });

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(this.product, {
      averageRating: 0,
      reviewCount: 0
    });
  } else {
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(this.product, {
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
