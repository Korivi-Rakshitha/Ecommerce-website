import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, fetchCart, removeFromCart, updateCartItem } = useContext(CartContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [user, fetchCart, navigate]);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity > 0) {
      await updateCartItem(productId, quantity);
    }
  };

  if (!cart) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.items && cart.items.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.images?.[0]} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p className="brand">{item.product.brand}</p>
                  <span className="price">₹{item.product.price.toLocaleString()}</span>
                </div>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                </div>
                <span className="item-total">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                <button onClick={() => handleRemove(item.product._id)} className="btn-remove">Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{cart.subtotal?.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Tax (18%):</span>
              <span>₹{cart.tax?.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{cart.total?.toLocaleString()}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="btn-continue">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
