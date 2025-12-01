const express = require('express');
const router = express.Router();

// const { createRating, listRatings } = require('../controllers/rating.controller');

router.post('/', (req, res) => {
  return res.json({ message: 'Create rating placeholder' });
});

router.get('/', (req, res) => {
  return res.json({ message: 'List ratings placeholder' });
});

module.exports = router;


