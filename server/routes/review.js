const express = require('express');
const { handleCreateReview, handleGetItemReviews } = require('../controllers/review/review');

const router = express.Router();

router.post('/create', handleCreateReview);
router.get('/view/:id', handleGetItemReviews);

module.exports = router;
