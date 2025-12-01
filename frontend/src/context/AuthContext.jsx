// Auth Context for managing authentication state
// Location: frontend/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    
    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response;
    }
    
    throw new Error(response.message || 'Login failed');
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    
    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response;
    }
    
    throw new Error(response.message || 'Registration failed');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const response = await authService.updatePassword({
      currentPassword,
      newPassword,
    });
    return response;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updatePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isOwner: user?.role === 'OWNER',
    isUser: user?.role === 'USER',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

