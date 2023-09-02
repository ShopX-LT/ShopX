const express = require('express');
const { handleStoreVisit } = require('../controllers/user/userController');

const router = express.Router();

router.post('/visit', handleStoreVisit);

module.exports = router;
