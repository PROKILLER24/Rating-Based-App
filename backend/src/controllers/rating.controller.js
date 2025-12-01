// Rating controller: connect routes to rating service
// Location: backend/src/controllers/rating.controller.js

const ratingService = require('../services/rating.service');
const { success, error } = require('../utils/response');

/**
 * Create or update a rating
 * POST /api/ratings
 */
const createOrUpdateRating = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;
    
    const result = await ratingService.createOrUpdateRating(userId, storeId, rating);
    return success(res, result, 'Rating submitted successfully', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Get user's ratings
 * GET /api/ratings/my-ratings
 */
const getMyRatings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ratings = await ratingService.getUserRatings(userId);
    return success(res, ratings, 'Ratings retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a rating
 * DELETE /api/ratings/:id
 */
const deleteRating = async (req, res, next) => {
  try {
    const ratingId = parseInt(req.params.id);
    const userId = req.user.id;
    
    await ratingService.deleteRating(ratingId, userId);
    return success(res, null, 'Rating deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrUpdateRating,
  getMyRatings,
  deleteRating,
};


