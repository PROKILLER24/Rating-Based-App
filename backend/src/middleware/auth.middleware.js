// Authentication and Authorization middleware
// Location: backend/src/middleware/auth.middleware.js

const { verifyToken } = require('../utils/jwt');
const { error } = require('../utils/response');
const { prisma } = require('../config/db');

/**
 * Middleware to verify JWT token and authenticate user
 */
const requireAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, 'No token provided', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        address: true,
      },
    });

    if (!user) {
      return error(res, 'User not found', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
};

/**
 * Middleware to check if user has required role(s)
 * @param {...String} roles - Allowed roles
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(res, 'Insufficient permissions', 403);
    }

    next();
  };
};

/**
 * Middleware to check if user is admin
 */
const requireAdmin = requireRole('ADMIN');

/**
 * Middleware to check if user is store owner
 */
const requireOwner = requireRole('OWNER');

/**
 * Middleware to check if user is normal user or owner
 */
const requireUserOrOwner = requireRole('USER', 'OWNER');

module.exports = {
  requireAuth,
  requireRole,
  requireAdmin,
  requireOwner,
  requireUserOrOwner,
};


