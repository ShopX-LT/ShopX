const express = require('express');

// CONTROLLERS
const { handleSignUp, handleSignIn } = require('../controllers/store/storeAuth');
const {
  handleAddField,
  handleGetField,
  handleGetAllOrders,
  handleUpdateOrder,
  handleGetStoreStats,
} = require('../controllers/store/store');
const { handleRefreshToken } = require('../controllers/refreshController');
const { handleLogout } = require('../controllers/logoutController');
// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);
router.get('/stats', verifyToken, handleGetStoreStats);
router.post('/field', verifyToken, handleAddField);
router.get('/field', verifyToken, handleGetField);
router.get('/order', verifyToken, handleGetAllOrders);
router.put('/update-order/:id', verifyToken, handleUpdateOrder);

module.exports = router;
