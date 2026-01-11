import React, { createContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);

  const updateWishlistProductIds = useCallback((items) => {
    const ids = items.map(item => item.product._id);
    setWishlistProductIds(ids);
  }, []);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      setWishlistItems(response.data.items || []);
      updateWishlistProductIds(response.data.items || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [updateWishlistProductIds]);

  const addToWishlist = async (productId) => {
    try {
      const response = await wishlistAPI.addToWishlist(productId);
      if (response.data.success) {
        setWishlistProductIds(prev => [...prev, productId]);
        await fetchWishlist();
        return true;
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await wishlistAPI.removeFromWishlist(productId);
      if (response.data.success) {
        setWishlistProductIds(prev => prev.filter(id => id !== productId));
        await fetchWishlist();
        return true;
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  };

  const clearWishlist = async () => {
    try {
      const response = await wishlistAPI.clearWishlist();
      if (response.data.success) {
        setWishlistItems([]);
        setWishlistProductIds([]);
        return true;
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlistProductIds.includes(productId);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchWishlist();
    }
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        fetchWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
