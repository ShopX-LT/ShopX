const express = require('express');
const { handleCheckout, handleverifyPayment } = require('../controllers/order/checkoutController');

const router = express.Router();

router.post('/checkout', handleCheckout);
router.post('/verify-payment', handleverifyPayment);

module.exports = router;
