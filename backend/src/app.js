// Express app configuration and middlewares
// Location: backend/src/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { FRONTEND_URL } = require('./config/env');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const storeRoutes = require('./routes/store.routes');
const ratingRoutes = require('./routes/rating.routes');
const ownerRoutes = require('./routes/owner.routes');
const adminRoutes = require('./routes/admin.routes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Basic middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;


