// Store routes
// Location: backend/src/routes/store.routes.js

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../utils/validation');

// Public route (for viewing stores)
router.get('/', validate(schemas.queryParams, 'query'), storeController.getAllStores);
router.get('/:id', storeController.getStoreById);

// Admin only routes
router.post('/', requireAuth, requireAdmin, validate(schemas.createStore), storeController.createStore);
router.put('/:id', requireAuth, requireAdmin, validate(schemas.updateStore), storeController.updateStore);
router.delete('/:id', requireAuth, requireAdmin, storeController.deleteStore);

module.exports = router;

