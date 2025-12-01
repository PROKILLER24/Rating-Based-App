// Admin controller: connect routes to admin service
// Location: backend/src/controllers/admin.controller.js

const adminService = require('../services/admin.service');
const { success, error } = require('../utils/response');

/**
 * Get admin dashboard statistics
 * GET /api/admin/dashboard
 */
const getDashboard = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    return success(res, stats, 'Dashboard statistics retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
};

