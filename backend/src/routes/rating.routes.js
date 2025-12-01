// Rating routes
// Location: backend/src/routes/rating.routes.js

const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const { requireAuth, requireUserOrOwner } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../utils/validation');

// Protected routes (User and Owner can rate)
router.post('/', requireAuth, requireUserOrOwner, validate(schemas.createRating), ratingController.createOrUpdateRating);
router.get('/my-ratings', requireAuth, requireUserOrOwner, ratingController.getMyRatings);
router.delete('/:id', requireAuth, requireUserOrOwner, ratingController.deleteRating);

module.exports = router;


