// Layout component with navigation
// Location: frontend/src/components/Layout.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout, isAdmin, isOwner, isUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">Rating App</Link>
        </div>
        <div className="nav-links">
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                  <Link to="/admin/users">Users</Link>
                  <Link to="/admin/stores">Stores</Link>
                </>
              )}
              {isUser && (
                <>
                  <Link to="/stores">Stores</Link>
                  <Link to="/my-ratings">My Ratings</Link>
                </>
              )}
              {isOwner && (
                <>
                  <Link to="/owner/dashboard">Owner Dashboard</Link>
                </>
              )}
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;

