// Admin Dashboard page
// Location: frontend/src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/admin.service';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) return <div className="error-message">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Users</p>
              <p className="text-4xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Stores</p>
              <p className="text-4xl font-bold">{stats.totalStores}</p>
            </div>
            <div className="text-5xl opacity-20">🏪</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Ratings</p>
              <p className="text-4xl font-bold">{stats.totalRatings}</p>
            </div>
            <div className="text-5xl opacity-20">⭐</div>
          </div>
        </div>
      </div>

      {/* Users by Role */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Users by Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium mb-1">Admins</p>
                <p className="text-3xl font-bold text-red-700">{stats.usersByRole.ADMIN}</p>
              </div>
              <div className="text-3xl">👨‍💼</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium mb-1">Users</p>
                <p className="text-3xl font-bold text-blue-700">{stats.usersByRole.USER}</p>
              </div>
              <div className="text-3xl">👤</div>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium mb-1">Owners</p>
                <p className="text-3xl font-bold text-orange-700">{stats.usersByRole.OWNER}</p>
              </div>
              <div className="text-3xl">🏪</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          to="/admin/users" 
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Manage Users</h3>
              <p className="text-gray-600">Add, view, and manage users and admins</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">→</div>
          </div>
        </Link>
        <Link 
          to="/admin/stores" 
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Manage Stores</h3>
              <p className="text-gray-600">Add, view, and manage store listings</p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">→</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

