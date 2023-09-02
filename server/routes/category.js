const express = require('express');
const {
  createCategory,
  getCategory,
  getCategoryForUsers,
  getCustomCategories,
} = require('../controllers/category/category');
// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createCategory);
router.get('/', verifyToken, getCategory);
router.get('/user', getCategoryForUsers);
router.get('/custom', getCustomCategories);

module.exports = router;
