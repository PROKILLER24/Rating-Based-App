// Owner Dashboard page
// Location: frontend/src/pages/OwnerDashboard.jsx

import React, { useEffect, useState } from 'react';
import { ownerService } from '../services/owner.service';
import './Dashboard.css';

const OwnerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await ownerService.getDashboard();
      setDashboard(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!dashboard) return null;

  return (
    <div className="dashboard">
      <h1>Owner Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p className="stat-value">{dashboard.totalStores}</p>
        </div>
        <div className="stat-card">
          <h3>Total Ratings</h3>
          <p className="stat-value">{dashboard.totalRatings}</p>
        </div>
      </div>
      <div className="stores-list">
        <h2>My Stores</h2>
        {dashboard.stores.map((store) => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p><strong>Email:</strong> {store.email}</p>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Average Rating:</strong> {store.averageRating.toFixed(2)} ⭐</p>
            <p><strong>Total Ratings:</strong> {store.totalRatings}</p>
            <div className="ratings-list">
              <h4>Recent Ratings:</h4>
              {store.ratings.length > 0 ? (
                <ul>
                  {store.ratings.slice(0, 5).map((rating) => (
                    <li key={rating.id}>
                      {rating.rating} ⭐ by {rating.user.name} ({rating.user.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ratings yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;

