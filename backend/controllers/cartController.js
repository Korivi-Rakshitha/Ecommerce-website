const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    // Calculate totals
    let subtotal = 0;
    let itemsToRemove = [];

    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      const prod = await Product.findById(item.product);
      if (prod) {
        subtotal += prod.price * item.quantity;
      } else {
        itemsToRemove.push(i);
      }
    }

    // Remove invalid items (in reverse to maintain indices)
    for (let i = itemsToRemove.length - 1; i >= 0; i--) {
      cart.items.splice(itemsToRemove[i], 1);
    }
    
    cart.subtotal = subtotal;
    cart.tax = Math.round(subtotal * 0.18 * 100) / 100;
    cart.total = cart.subtotal + cart.tax;
    
    await cart.save();
    cart = await cart.populate('items.product');
    
    res.json({ success: true, message: 'Added to cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    // Recalculate totals
    let subtotal = 0;
    let itemsToRemove = [];

    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      const product = await Product.findById(item.product);
      if (product) {
        subtotal += product.price * item.quantity;
      } else {
        itemsToRemove.push(i);
      }
    }

    // Remove invalid items
    for (let i = itemsToRemove.length - 1; i >= 0; i--) {
      cart.items.splice(itemsToRemove[i], 1);
    }
    
    cart.subtotal = subtotal;
    cart.tax = Math.round(subtotal * 0.18 * 100) / 100;
    cart.total = cart.subtotal + cart.tax;
    
    await cart.save();
    cart = await cart.populate('items.product');
    
    res.json({ success: true, message: 'Removed from cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }
    
    item.quantity = quantity;
    
    // Recalculate totals
    let subtotal = 0;
    let itemsToRemove = [];

    for (let i = 0; i < cart.items.length; i++) {
      const cartItem = cart.items[i];
      const product = await Product.findById(cartItem.product);
      if (product) {
        subtotal += product.price * cartItem.quantity;
      } else {
        itemsToRemove.push(i);
      }
    }

    // Remove invalid items
    for (let i = itemsToRemove.length - 1; i >= 0; i--) {
      cart.items.splice(itemsToRemove[i], 1);
    }
    
    cart.subtotal = subtotal;
    cart.tax = Math.round(subtotal * 0.18 * 100) / 100;
    cart.total = cart.subtotal + cart.tax;
    
    await cart.save();
    cart = await cart.populate('items.product');
    
    res.json({ success: true, message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], subtotal: 0, tax: 0, total: 0 },
      { new: true }
    );
    
    res.json({ success: true, message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
