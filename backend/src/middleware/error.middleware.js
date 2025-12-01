// Global error handler middleware
// Location: backend/src/middleware/error.middleware.js

const { error } = require('../utils/response');
const { NODE_ENV } = require('../config/env');

/**
 * Global error handler middleware
 * Handles all errors thrown in the application
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return error(res, 'Duplicate entry. This record already exists.', 409);
  }

  if (err.code === 'P2025') {
    return error(res, 'Record not found', 404);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return error(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return error(res, 'Token expired', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return error(res, err.message, 400);
  }

  // Custom application errors
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  // Don't expose internal errors in production
  const errorMessage = NODE_ENV === 'production' && status === 500 
    ? 'Internal server error' 
    : message;

  return error(res, errorMessage, status);
};

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
  return error(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = {
  errorHandler,
  notFound,
};


