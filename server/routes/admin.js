const express = require('express');

// CONTROLLERS
const { signUp, signIn } = require('../controllers/store/storeAuth');
// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
