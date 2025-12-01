// User controller: connect routes to user service
// Location: backend/src/controllers/user.controller.js

const userService = require('../services/user.service');
const { success, error } = require('../utils/response');

/**
 * Get current user profile
 * GET /api/users/profile
 */
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await userService.getProfile(userId);
    return success(res, profile, 'Profile retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Get all users (Admin only)
 * GET /api/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      search: req.query.search,
      role: req.query.role,
    };
    
    const result = await userService.getAllUsers(options);
    return success(res, result, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Get user by ID (Admin only)
 * GET /api/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    return success(res, user, 'User retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new user (Admin only)
 * POST /api/users
 */
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return success(res, user, 'User created successfully', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  getAllUsers,
  getUserById,
  createUser,
};


