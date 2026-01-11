const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('items.product')
      .sort({ 'items.addedAt': -1 });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        message: 'Wishlist is empty',
        items: []
      });
    }

    res.status(200).json({
      success: true,
      items: wishlist.items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message
    });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      // Create new wishlist if doesn't exist
      wishlist = await Wishlist.create({
        user: req.user.id,
        items: [{ product: productId }]
      });
    } else {
      // Check if product already in wishlist
      const itemExists = wishlist.items.some(item => 
        item.product.toString() === productId
      );

      if (itemExists) {
        return res.status(400).json({
          success: false,
          message: 'Product already in wishlist'
        });
      }

      wishlist.items.push({ product: productId });
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product added to wishlist',
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to wishlist',
      error: error.message
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.items = wishlist.items.filter(item => 
      item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from wishlist',
      error: error.message
    });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared',
      wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing wishlist',
      error: error.message
    });
  }
};

exports.checkWishlistItems = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlistProductIds: []
      });
    }

    const wishlistProductIds = wishlist.items.map(item => item.product.toString());

    res.status(200).json({
      success: true,
      wishlistProductIds
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist items',
      error: error.message
    });
  }
};
