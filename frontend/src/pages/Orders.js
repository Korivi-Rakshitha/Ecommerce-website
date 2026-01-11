import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import '../styles/Orders.css';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffc107',
      'CONFIRMED': '#17a2b8',
      'SHIPPED': '#007bff',
      'DELIVERED': '#28a745',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id?.slice(-6)}</h3>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="order-status">
                <span style={{ color: getStatusColor(order.orderStatus) }}>
                  Status: {order.orderStatus}
                </span>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.product?.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price?.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total">Total: ₹{order.total?.toLocaleString()}</span>
                {order.trackingNumber && (
                  <span className="tracking">Tracking: {order.trackingNumber}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet</p>
      )}
    </div>
  );
};

export default Orders;
