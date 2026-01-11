import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon-wrapper">
          <div className="success-icon">✨</div>
        </div>
        
        <h1>Thank You!</h1>
        <p className="success-message">
          Your order has been placed successfully. We're getting it ready for you!
        </p>
        
        <div className="order-details-box">
          <div className="detail-item">
            <span className="label">Order Status</span>
            <span className="value status-pill">Confirmed</span>
          </div>
          {orderId && (
            <div className="detail-item">
              <span className="label">Order ID</span>
              <span className="value id-text">{orderId}</span>
            </div>
          )}
        </div>
        
        <p className="confirmation-note">
          A confirmation email has been sent to your registered email address.
        </p>
        
        <div className="success-actions">
          <Link to="/orders" className="btn-primary">View My Orders</Link>
          <Link to="/" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
