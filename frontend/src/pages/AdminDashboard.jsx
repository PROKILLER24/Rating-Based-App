// Admin Dashboard page
// Location: frontend/src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/admin.service';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboard();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!stats) return null;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p className="stat-value">{stats.totalStores}</p>
        </div>
        <div className="stat-card">
          <h3>Total Ratings</h3>
          <p className="stat-value">{stats.totalRatings}</p>
        </div>
      </div>
      <div className="role-stats">
        <h2>Users by Role</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Admins</h3>
            <p className="stat-value">{stats.usersByRole.ADMIN}</p>
          </div>
          <div className="stat-card">
            <h3>Users</h3>
            <p className="stat-value">{stats.usersByRole.USER}</p>
          </div>
          <div className="stat-card">
            <h3>Owners</h3>
            <p className="stat-value">{stats.usersByRole.OWNER}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-actions">
        <Link to="/admin/users" className="action-btn">Manage Users</Link>
        <Link to="/admin/stores" className="action-btn">Manage Stores</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

