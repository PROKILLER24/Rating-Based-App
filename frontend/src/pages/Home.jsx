// Home page
// Location: frontend/src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user, isAdmin, isUser, isOwner } = useAuth();

  return (
    <div className="home">
      <h1>Welcome to Rating App</h1>
      {isAuthenticated ? (
        <div className="welcome-section">
          <p>Welcome back, {user.name}!</p>
          <div className="quick-links">
            {isAdmin && (
              <>
                <Link to="/admin/dashboard" className="quick-link">Admin Dashboard</Link>
                <Link to="/admin/users" className="quick-link">Manage Users</Link>
                <Link to="/admin/stores" className="quick-link">Manage Stores</Link>
              </>
            )}
            {isUser && (
              <>
                <Link to="/stores" className="quick-link">Browse Stores</Link>
                <Link to="/my-ratings" className="quick-link">My Ratings</Link>
              </>
            )}
            {isOwner && (
              <>
                <Link to="/owner/dashboard" className="quick-link">Owner Dashboard</Link>
              </>
            )}
            <Link to="/profile" className="quick-link">Profile</Link>
          </div>
        </div>
      ) : (
        <div className="welcome-section">
          <p>Please login or sign up to get started.</p>
          <div className="quick-links">
            <Link to="/login" className="quick-link">Login</Link>
            <Link to="/register" className="quick-link">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

