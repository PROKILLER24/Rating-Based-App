const express = require('express');
const router = express.Router();

// const { getProfile } = require('../controllers/user.controller');

router.get('/me', (req, res) => {
  return res.json({ message: 'User profile placeholder' });
});

module.exports = router;


