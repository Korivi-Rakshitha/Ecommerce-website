import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  googleLogin: (tokenId) => api.post('/auth/google-login', { tokenId }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Product API
export const productAPI = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data)
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart/add', data),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  updateCartItem: (data) => api.put('/cart/update', data),
  clearCart: () => api.delete('/cart/clear')
};

// Order API
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/user/my-orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params) => api.get('/orders', { params }),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`)
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId) => api.post('/wishlist/remove', { productId }),
  clearWishlist: () => api.delete('/wishlist/clear')
};

// Review API
export const reviewAPI = {
  getProductReviews: (productId) => api.get(`/products/${productId}`), // Reviews are populated in product details
  createReview: (productId, data) => api.post(`/products/${productId}/reviews`, data)
};

export default api;
