// Register page
// Location: frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name (20-60 characters)</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength={20}
              maxLength={60}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password (8-16 chars, 1 uppercase, 1 special)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              maxLength={16}
              required
            />
          </div>
          <div className="form-group">
            <label>Address (optional, max 400 chars)</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={400}
              rows={3}
            />
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

