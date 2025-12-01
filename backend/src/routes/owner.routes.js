// Owner routes
// Location: backend/src/routes/owner.routes.js

const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner.controller');
const { requireAuth, requireOwner } = require('../middleware/auth.middleware');

// Owner only routes
router.get('/dashboard', requireAuth, requireOwner, ownerController.getDashboard);
router.get('/stores/:storeId/ratings', requireAuth, requireOwner, ownerController.getStoreRatings);

module.exports = router;

