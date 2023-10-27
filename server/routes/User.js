const express = require('express');
const { handleStoreVisit, handleSubscribeToStore } = require('../controllers/user/userController');

const router = express.Router();

router.post('/visit', handleStoreVisit);
router.get('/subscribe/:reference', handleSubscribeToStore);

module.exports = router;
