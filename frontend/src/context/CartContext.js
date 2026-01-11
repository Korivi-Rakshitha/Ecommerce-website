import React, { createContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart || { items: [] });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart({ items: [] });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      await cartAPI.addToCart({ productId, quantity });
      await fetchCart();
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      await cartAPI.removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setLoading(true);
      await cartAPI.updateCartItem({ productId, quantity });
      await fetchCart();
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCart({ items: [] });
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      getCartTotal,
      getCartCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
