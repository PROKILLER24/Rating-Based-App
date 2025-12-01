// Auth routes
// Location: backend/src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../utils/validation');

// Public routes
router.post('/register', validate(schemas.register), authController.register);
router.post('/login', validate(schemas.login), authController.login);

// Protected routes
router.put('/password', requireAuth, validate(schemas.updatePassword), authController.updatePassword);

module.exports = router;


