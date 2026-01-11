import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import '../styles/Checkout.css';

import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [addressSearch, setAddressSearch] = useState('');
  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.name || '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      phone: user?.phone || ''
    },
    paymentMethod: 'CASH_ON_DELIVERY'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const searchAddress = async (query) => {
    setAddressSearch(query);
    if (query.length > 3) {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&countrycodes=in`);
        setAddressSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleSelectAddress = (addr) => {
    const parts = addr.display_name.split(', ');
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        street: parts[0] || '',
        city: addr.address?.city || addr.address?.town || addr.address?.village || parts[1] || '',
        state: addr.address?.state || '',
        zipCode: addr.address?.postcode || '',
        country: addr.address?.country || 'India'
      }
    }));
    setAddressSearch(addr.display_name);
    setAddressSuggestions([]);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const response = await orderAPI.createOrder(formData);
      const orderId = response.data.order._id;
      await clearCart();
      navigate('/order-success', { state: { orderId } });
    } catch (err) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="checkout-empty">Cart is empty. <a href="/">Go shopping</a></div>;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-section">
          <h2>Shipping Address</h2>
          {error && <p className="error">{error}</p>}
          
          <div className="address-search">
            <input
              type="text"
              placeholder="🔍 Search address in real-time..."
              value={addressSearch}
              onChange={(e) => searchAddress(e.target.value)}
              className="search-input"
            />
            {addressSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {addressSuggestions.map((addr) => (
                  <li key={addr.place_id} onClick={() => handleSelectAddress(addr)}>
                    {addr.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.shippingAddress.name}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.shippingAddress.street}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.shippingAddress.city}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.shippingAddress.state}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.shippingAddress.zipCode}
            onChange={handleAddressChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.shippingAddress.phone}
            onChange={handleAddressChange}
            required
          />
        </div>

        <div className="checkout-section">
          <h2>Payment Method</h2>
          <select 
            value={formData.paymentMethod} 
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
          >
            <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="checkout-summary">
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
          <button type="submit" disabled={loading} className="btn-place-order">
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
