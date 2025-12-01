// User Stores List page
// Location: frontend/src/pages/Stores.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storeService } from '../services/store.service';
import './List.css';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-page">
      <h1>Stores</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="stores-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p><strong>Email:</strong> {store.email}</p>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Rating:</strong> {store.averageRating.toFixed(2)} ⭐ ({store.totalRatings} ratings)</p>
            <Link to={`/stores/${store.id}`} className="view-btn">View & Rate</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;

