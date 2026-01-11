import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
      alert('Product added to cart!');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="product-content">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || '/placeholder-image.jpg'}
              alt={product.name}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            <StarRating rating={product.rating || 0} readonly />
            <span>({product.reviewCount || 0} reviews)</span>
          </div>
          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!user}
              >
                {user ? 'Add to Cart' : 'Login to Add to Cart'}
              </button>
            </div>
          )}

          {user && (
            <button
              className="write-review-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          )}
        </div>
      </div>

      {showReviewForm && user && (
        <ReviewForm
          productId={product._id}
          onReviewSubmitted={() => {
            setShowReviewForm(false);
            fetchProduct(); // Refresh product data to update rating
          }}
        />
      )}

      <ReviewList productId={product._id} />
    </div>
  );
};

export default ProductDetails;
