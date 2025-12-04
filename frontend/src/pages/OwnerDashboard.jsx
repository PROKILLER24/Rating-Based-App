// Owner Dashboard page
// Location: frontend/src/pages/OwnerDashboard.jsx

import React, { useEffect, useState } from 'react';
import { ownerService } from '../services/owner.service';

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

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
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
  if (!dashboard) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Owner Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Total Stores</p>
              <p className="text-4xl font-bold">{dashboard.totalStores}</p>
            </div>
            <div className="text-5xl opacity-20">🏪</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Ratings</p>
              <p className="text-4xl font-bold">{dashboard.totalRatings}</p>
            </div>
            <div className="text-5xl opacity-20">⭐</div>
          </div>
        </div>
      </div>

      {/* Stores List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My Stores</h2>
        {dashboard.stores.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores yet</h3>
            <p className="text-gray-600">Contact an administrator to add your store</p>
          </div>
        ) : (
          dashboard.stores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${
                store.averageRating >= 4 ? 'from-green-400 to-green-600' :
                store.averageRating >= 3 ? 'from-yellow-400 to-yellow-600' :
                'from-red-400 to-red-600'
              }`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{store.name}</h3>
                    <p className="text-gray-600 mb-1"><span className="font-medium">✉️</span> {store.email}</p>
                    <p className="text-gray-600"><span className="font-medium">📍</span> {store.address}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${getRatingColor(store.averageRating)}`}>
                      {store.averageRating.toFixed(1)}
                    </p>
                    <div className="flex items-center justify-end">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= Math.round(store.averageRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Ratings</h4>
                  {store.ratings.length > 0 ? (
                    <div className="space-y-2">
                      {store.ratings.slice(0, 5).map((rating) => (
                        <div key={rating.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div>
                            <p className="font-medium text-gray-900">{rating.user.name}</p>
                            <p className="text-sm text-gray-600">{rating.user.email}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xl font-bold text-gray-900">{rating.rating}</span>
                            <span className="text-yellow-400">⭐</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No ratings yet</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;

