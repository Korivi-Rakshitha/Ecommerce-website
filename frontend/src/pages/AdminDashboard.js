import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { productAPI, orderAPI } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: ''
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const response = await productAPI.getAllProducts({ limit: 100 });
        setProducts(response.data.products);
      } else if (activeTab === 'orders') {
        const response = await orderAPI.getAllOrders({ limit: 100 });
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate, loadData]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct({...newProduct, price: parseFloat(newProduct.price)});
      setNewProduct({ name: '', description: '', price: '', category: '', brand: '', stock: '' });
      loadData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productAPI.deleteProduct(id);
        loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'products' && (
            <div className="admin-section">
              <h2>Manage Products</h2>
              
              <form onSubmit={handleAddProduct} className="add-product-form">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
                <button type="submit">Add Product</button>
              </form>

              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>₹{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.category}</td>
                        <td>
                          <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="admin-section">
              <h2>Manage Orders</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>#{order._id?.slice(-6)}</td>
                        <td>{order.user?.name}</td>
                        <td>₹{order.total}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
