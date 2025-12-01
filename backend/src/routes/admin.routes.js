// Admin routes
// Location: backend/src/routes/admin.routes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');

// Admin only routes
router.get('/dashboard', requireAuth, requireAdmin, adminController.getDashboard);

module.exports = router;

