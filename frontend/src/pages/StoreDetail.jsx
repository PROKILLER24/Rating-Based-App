// Store Detail page with rating
// Location: frontend/src/pages/StoreDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storeService } from '../services/store.service';
import { ratingService } from '../services/rating.service';
import { useAuth } from '../context/AuthContext';
import './StoreDetail.css';

const StoreDetail = () => {
  const { id } = useParams();
  const { isUser } = useAuth();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      await ratingService.createOrUpdateRating({
        storeId: parseInt(id),
        rating,
      });
      await fetchStore(); // Refresh store data
    } catch (err) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!store) return null;

  return (
    <div className="store-detail">
      <h1>{store.name}</h1>
      <div className="store-info">
        <p><strong>Email:</strong> {store.email}</p>
        <p><strong>Address:</strong> {store.address}</p>
        <p><strong>Average Rating:</strong> {store.averageRating.toFixed(2)} ⭐</p>
        <p><strong>Total Ratings:</strong> {store.totalRatings}</p>
      </div>
      {isUser && (
        <div className="rating-section">
          <h2>Rate this store</h2>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn ${rating >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ⭐
              </button>
            ))}
          </div>
          <button
            onClick={handleRatingSubmit}
            disabled={submitting || rating < 1}
            className="submit-rating-btn"
          >
            {submitting ? 'Submitting...' : store.userRating ? 'Update Rating' : 'Submit Rating'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;

