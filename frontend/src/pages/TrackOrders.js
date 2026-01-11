import React, { useState } from 'react';
import '../styles/ContentPages.css';

const TrackOrders = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrderData({
        id: trackingId,
        status: 'Shipped',
        date: '2026-01-10',
        items: [
          { name: 'Wireless Headphones', quantity: 1, price: '$49.99' }
        ],
        estimatedDelivery: '2026-01-15',
        timeline: [
          { date: '2026-01-10', status: 'Order Placed', icon: '✓' },
          { date: '2026-01-11', status: 'Processing', icon: '✓' },
          { date: '2026-01-12', status: 'Shipped', icon: '✓' },
          { date: '2026-01-15', status: 'Expected Delivery', icon: '◯' }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Track Your Order</h1>
        <p>Enter your order ID to track the status of your delivery.</p>
        
        <form className="track-form" onSubmit={handleSearch}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your Order ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="track-input"
            />
            <button type="submit" className="submit-btn">Track Order</button>
          </div>
        </form>

        {loading && <p className="loading">Loading order details...</p>}

        {orderData && (
          <div className="order-tracking">
            <div className="order-header">
              <h2>Order #{orderData.id}</h2>
              <p className="order-status">{orderData.status}</p>
            </div>

            <div className="order-items">
              <h3>Order Items</h3>
              {orderData.items.map((item, index) => (
                <div key={index} className="item">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            <div className="timeline">
              <h3>Delivery Timeline</h3>
              {orderData.timeline.map((step, index) => (
                <div key={index} className={`timeline-item ${step.status === 'Shipped' || step.status === 'Processing' || step.status === 'Order Placed' ? 'completed' : ''}`}>
                  <div className="timeline-icon">{step.icon}</div>
                  <div className="timeline-content">
                    <p className="timeline-date">{step.date}</p>
                    <p className="timeline-status">{step.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="estimated-delivery">
              <p>Estimated Delivery: <strong>{orderData.estimatedDelivery}</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
