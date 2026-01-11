import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const FALLBACK_IMG = 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg';
  const inWishlist = isInWishlist(product._id);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    if (inWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert(error.message || 'Failed to add product to cart. Please login first.');
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-image">
        <img 
          src={product.images?.[0] || FALLBACK_IMG} 
          alt={product.name}
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span>⭐</span> {product.rating?.toFixed(1) || '0.0'}
        </div>
        <div className="product-price">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
