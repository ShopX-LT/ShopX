const express = require('express');
const { handleStoreVisits, handleSubscribeToStore } = require('../controllers/user/userController');

const router = express.Router();

router.post('/visit', handleStoreVisits);
router.get('/subscribe/:reference', handleSubscribeToStore);

module.exports = router;
