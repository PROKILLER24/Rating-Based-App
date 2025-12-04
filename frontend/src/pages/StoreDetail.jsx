// Store Detail page with rating
// Location: frontend/src/pages/StoreDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storeService } from '../services/store.service';
import { ratingService } from '../services/rating.service';
import { useAuth } from '../context/AuthContext';

const StoreDetail = () => {
  const { id } = useParams();
  const { isUser } = useAuth();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStore();
  }, [id]);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getStoreById(id);
      setStore(response.data);
      if (response.data.userRating) {
        setRating(response.data.userRating.rating);
      }
    } catch (err) {
      setError(err.message || 'Failed to load store');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    if (!isUser || rating < 1 || rating > 5) return;

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      await ratingService.createOrUpdateRating({
        storeId: parseInt(id),
        rating,
      });
      setSuccess('Rating submitted successfully!');
      await fetchStore(); // Refresh store data
    } catch (err) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
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
          <p className="text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }
  
  if (error && !store) return <div className="error-message">{error}</div>;
  if (!store) return null;

  return (
    <div className="space-y-6">
      <Link 
        to="/stores" 
        className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors"
      >
        ← Back to Stores
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${
          store.averageRating >= 4 ? 'from-green-400 to-green-600' :
          store.averageRating >= 3 ? 'from-yellow-400 to-yellow-600' :
          'from-red-400 to-red-600'
        }`}></div>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{store.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                <p className="text-lg text-gray-900">{store.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                <p className="text-lg text-gray-900">{store.address}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Average Rating</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-3xl font-bold ${getRatingColor(store.averageRating)}`}>
                    {store.averageRating.toFixed(1)}
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          star <= Math.round(store.averageRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Ratings</p>
                <p className="text-lg text-gray-900">{store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'}</p>
              </div>
            </div>
          </div>

          {isUser && (
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate this Store</h2>
              {error && <div className="error-message mb-4">{error}</div>}
              {success && <div className="success-message mb-4">{success}</div>}
              
              <div className="flex items-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-5xl transition-all transform hover:scale-110 ${
                      rating >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-4 text-xl font-semibold text-gray-700">
                    {rating} {rating === 1 ? 'star' : 'stars'}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleRatingSubmit}
                disabled={submitting || rating < 1}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg shadow-md hover:shadow-lg"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  store.userRating ? 'Update Rating' : 'Submit Rating'
                )}
              </button>
              {store.userRating && (
                <p className="mt-4 text-sm text-gray-600">
                  Your current rating: <span className="font-semibold">{store.userRating.rating} ⭐</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;

