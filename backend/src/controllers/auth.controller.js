// Auth controller: connect routes to auth service
// Location: backend/src/controllers/auth.controller.js

const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return success(res, result, 'User registered successfully', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return success(res, result, 'Login successful');
  } catch (err) {
    next(err);
  }
};

/**
 * Update password
 * PUT /api/auth/password
 */
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    await authService.updatePassword(userId, currentPassword, newPassword);
    return success(res, null, 'Password updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  updatePassword,
};


