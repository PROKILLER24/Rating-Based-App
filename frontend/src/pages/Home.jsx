// Home page
// Location: frontend/src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user, isAdmin, isUser, isOwner } = useAuth();

  return (
    <div className="text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Rating App</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Rate and discover the best stores in your area. Share your experiences and help others make informed decisions.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-primary-600">{user.name}</span>!
            </h2>
            <p className="text-gray-600">Choose an option below to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isAdmin && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="group p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
                  <p className="text-sm text-gray-600">View system statistics and manage platform</p>
                </Link>
                <Link 
                  to="/admin/users" 
                  className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
                  <p className="text-sm text-gray-600">Add and manage users and admins</p>
                </Link>
                <Link 
                  to="/admin/stores" 
                  className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🏪</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Stores</h3>
                  <p className="text-sm text-gray-600">Add and manage store listings</p>
                </Link>
              </>
            )}
            {isUser && (
              <>
                <Link 
                  to="/stores" 
                  className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🛍️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Stores</h3>
                  <p className="text-sm text-gray-600">Explore and rate stores</p>
                </Link>
              </>
            )}
            {isOwner && (
              <>
                <Link 
                  to="/owner/dashboard" 
                  className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Owner Dashboard</h3>
                  <p className="text-sm text-gray-600">View your store ratings and analytics</p>
                </Link>
              </>
            )}
            <Link 
              to="/profile" 
              className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h2>
            <p className="text-gray-600">Please login or sign up to start rating stores</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

