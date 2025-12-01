// Owner controller: connect routes to owner service
// Location: backend/src/controllers/owner.controller.js

const ownerService = require('../services/owner.service');
const { success, error } = require('../utils/response');

/**
 * Get owner dashboard
 * GET /api/owner/dashboard
 */
const getDashboard = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const dashboard = await ownerService.getOwnerDashboard(ownerId);
    return success(res, dashboard, 'Dashboard retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Get store ratings (Owner only)
 * GET /api/owner/stores/:storeId/ratings
 */
const getStoreRatings = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const ownerId = req.user.id;
    const result = await ownerService.getStoreRatings(storeId, ownerId);
    return success(res, result, 'Store ratings retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
  getStoreRatings,
};

