const Product = require('../models/Product');

const categoryFallbacks = {
  Electronics: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
  Dresses: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
  'Home & Kitchen': 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg',
  Bags: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
  Accessories: 'https://images.pexels.com/photos/19090/pexels-photo.jpg'
};

const getFallbackImage = (category) => {
  return categoryFallbacks[category] || 'https://images.unsplash.com/photo-1526178613296-2d4f0d4f6f2d?w=500&h=500&fit=crop';
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
    
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    // Ensure each product has at least one valid image URL; filter out falsy entries
    const safeProducts = products.map(p => {
      const obj = p.toObject();
      obj.images = Array.isArray(obj.images) ? obj.images.filter(Boolean) : [];
      if (obj.images.length === 0) {
        obj.images = [getFallbackImage(obj.category)];
      }
      return obj;
    });

    res.json({
      success: true,
      products: safeProducts,
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

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const productDoc = await Product.findById(req.params.id).populate('reviews.user', 'name');
    
    if (!productDoc) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const product = productDoc.toObject();
    product.images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    if (product.images.length === 0) product.images = [getFallbackImage(product.category)];
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, brand, stock, images } = req.body;
    
    if (!name || !description || !price || !category || !brand) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const product = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || price,
      category,
      brand,
      stock: stock || 0,
      images: (images && images.length) ? images : [getFallbackImage(category)],
      seller: req.user.id
    });
    
    await product.save();
    res.status(201).json({ success: true, message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, brand, stock, images, isFeatured } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        originalPrice: originalPrice || price,
        category,
        brand,
        stock,
        images: (images && images.length) ? images : undefined,
        isFeatured,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    const review = {
      user: req.user.id,
      rating,
      comment
    };
    
    product.reviews.push(review);
    
    const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
    product.rating = avgRating;
    
    await product.save();
    
    res.json({ success: true, message: 'Review added', product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
