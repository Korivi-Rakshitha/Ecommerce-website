import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <h2>Please login to view your wishlist</h2>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleMoveToCart = async (item) => {
    await addToCart(item.product._id, 1);
    await removeFromWishlist(item.product._id);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="wishlist-container">
          <div className="wishlist-header">
            <p>{wishlistItems.length} item(s) in wishlist</p>
            <button className="btn-secondary" onClick={clearWishlist}>
              Clear Wishlist
            </button>
          </div>

          <div className="wishlist-items">
            {wishlistItems.map(item => (
              <div key={item._id} className="wishlist-item">
                <div
                  className="item-image"
                  role="img"
                  aria-label={item.product.name}
                  onClick={() => handleViewProduct(item.product._id)}
                  style={{
                    backgroundImage: `url(${item.product.images?.[0] || 'https://images.unsplash.com/photo-1526178613296-2d4f0d4f6f2d?w=500&h=500&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                  }}
                />

                <div className="item-details">
                  <h3 onClick={() => handleViewProduct(item.product._id)}>
                    {item.product.name}
                  </h3>
                  <p className="item-brand">{item.product.brand}</p>
                  <p className="item-category">{item.product.category}</p>

                  <div className="item-rating">
                    <span className="stars">
                      {'⭐'.repeat(Math.floor(item.product.rating))}
                    </span>
                    <span className="rating-value">
                      {item.product.rating?.toFixed(1)} ({item.product.reviews?.length || 0})
                    </span>
                  </div>

                  <div className="item-price">
                    <span className="current-price">₹{item.product.price}</span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="original-price">₹{item.product.originalPrice}</span>
                    )}
                  </div>

                  <p className={`item-stock ${item.product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                    {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>

                  <p className="added-date">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="item-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.product.stock === 0}
                  >
                    Move to Cart
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => removeFromWishlist(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
