const express = require('express');

// CONTROLLERS
const { handleGetTopSales } = require('../controllers/Item');
// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/top-sales', verifyToken, handleGetTopSales);

module.exports = router;
