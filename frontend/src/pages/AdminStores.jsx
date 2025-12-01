// Admin Stores List page
// Location: frontend/src/pages/AdminStores.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storeService } from '../services/store.service';
import './List.css';

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getAllStores(filters);
      setStores(response.data.stores);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-page">
      <h1>Stores Management</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or address"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="averageRating">Sort by Rating</option>
        </select>
        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Total Ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.averageRating.toFixed(2)} ⭐</td>
              <td>{store.totalRatings}</td>
              <td>
                <Link to={`/stores/${store.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={pagination.page === 1}
          onClick={() => handleFilterChange('page', filters.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => handleFilterChange('page', filters.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminStores;

