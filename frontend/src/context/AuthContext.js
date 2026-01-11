import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token, fetchUserProfile]);

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (tokenId) => {
    try {
      setLoading(true);
      const response = await authAPI.googleLogin(tokenId);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
