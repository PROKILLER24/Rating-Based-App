// Store controller: connect routes to store service
// Location: backend/src/controllers/store.controller.js

const storeService = require('../services/store.service');
const { success, error } = require('../utils/response');

/**
 * Create a new store (Admin only)
 * POST /api/stores
 */
const createStore = async (req, res, next) => {
  try {
    const store = await storeService.createStore(req.body);
    return success(res, store, 'Store created successfully', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all stores with filtering and sorting
 * GET /api/stores
 */
const getAllStores = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      search: req.query.search,
    };
    
    const result = await storeService.getAllStores(options);
    return success(res, result, 'Stores retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Get store by ID
 * GET /api/stores/:id
 */
const getStoreById = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.id);
    const userId = req.user?.id || null; // Optional: get user's rating if authenticated
    const store = await storeService.getStoreById(storeId, userId);
    return success(res, store, 'Store retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Update store (Admin only)
 * PUT /api/stores/:id
 */
const updateStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.id);
    const store = await storeService.updateStore(storeId, req.body);
    return success(res, store, 'Store updated successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Delete store (Admin only)
 * DELETE /api/stores/:id
 */
const deleteStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.id);
    await storeService.deleteStore(storeId);
    return success(res, null, 'Store deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};

