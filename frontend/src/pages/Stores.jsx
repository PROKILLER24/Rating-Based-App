// User Stores List page
// Location: frontend/src/pages/Stores.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storeService } from '../services/store.service';

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getAllStores({
        page: 1,
        limit: 20,
        search,
        sortBy: 'averageRating',
        sortOrder: 'desc',
      });
      setStores(response.data.stores);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'from-green-400 to-green-600';
    if (rating >= 3) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading stores...</p>
        </div>
      </div>
    );
  }
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Browse Stores</h1>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Stores Grid */}
      {stores.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div 
              key={store.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
            >
              <div className={`h-2 bg-gradient-to-r ${getRatingColor(store.averageRating)}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{store.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">📍</span> {store.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">✉️</span> {store.email}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {store.averageRating.toFixed(1)}
                    </p>
                    <div className="flex items-center">
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
                    <p className="text-xs text-gray-500 mt-1">
                      {store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/stores/${store.id}`}
                  className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  View & Rate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;

