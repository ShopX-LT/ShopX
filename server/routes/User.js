const express = require('express');
const { handleStoreVisits, handleSubscribeToStore } = require('../controllers/user/userController');
const { handleUserSignIn, handleUserSignUp } = require('../controllers/user/userAuth');

const router = express.Router();

router.post('/signup', handleUserSignUp);
router.post('/signin', handleUserSignIn);
router.post('/visit', handleStoreVisits);
router.get('/subscribe/:reference', handleSubscribeToStore);

module.exports = router;
