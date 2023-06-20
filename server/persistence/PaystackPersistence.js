const Paystack = require('paystack');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const paystackKey = process.env.PAYSTACK_KEY;
const headers = {
  headers: { Authorization: `Bearer ${paystackKey}` },
};

const initiateTransaction = async ({ body }) => {
  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', body, headers);
    const data = response.data.data;
    const { authorization_url, access_code, reference } = data;
    return authorization_url;
  } catch (error) {
    console.error('Paystack Persistence error in initiateTransaction()', error);
    return null;
  }
};

const verifyPayment = async ({ reference }) => {
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, headers);
    return response.data.data;
  } catch (error) {
    console.error('Paystack Persistence error in verifyPayment()', error);
    return null;
  }
};
module.exports = {
  initiateTransaction,
  verifyPayment,
};
