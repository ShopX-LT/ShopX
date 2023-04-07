const express = require('express');
const { createCategory, getCategory } = require('../controllers/category/category');
// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createCategory);
router.get('/', verifyToken, getCategory);

module.exports = router;
