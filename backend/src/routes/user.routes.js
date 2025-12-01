// User routes
// Location: backend/src/routes/user.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../utils/validation');

// Protected routes
router.get('/profile', requireAuth, userController.getProfile);

// Admin only routes
router.get('/', requireAuth, requireAdmin, validate(schemas.queryParams, 'query'), userController.getAllUsers);
router.get('/:id', requireAuth, requireAdmin, userController.getUserById);
router.post('/', requireAuth, requireAdmin, validate(schemas.register), userController.createUser);

module.exports = router;


