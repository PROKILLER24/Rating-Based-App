// Layout component with navigation
// Location: frontend/src/components/Layout.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout, isAdmin, isOwner, isUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:from-primary-700 hover:to-primary-900 transition-all"
              >
                ⭐ Rating App
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {isAdmin && (
                    <>
                      <Link 
                        to="/admin/dashboard" 
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Users
                      </Link>
                      <Link 
                        to="/admin/stores" 
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Stores
                      </Link>
                    </>
                  )}
                  {isUser && (
                    <>
                      <Link 
                        to="/stores" 
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Browse Stores
                      </Link>
                    </>
                  )}
                  {isOwner && (
                    <>
                      <Link 
                        to="/owner/dashboard" 
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        Owner Dashboard
                      </Link>
                    </>
                  )}
                  <Link 
                    to="/profile" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-gray-700 rounded-md text-sm font-medium hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

export default Layout;

