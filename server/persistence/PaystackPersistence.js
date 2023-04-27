const Paystack = require('paystack');
const axios = require('axios');
const paystackKey = new Paystack(process.env.PAYSTACK_KEY);
const headers = {
  headers: { Authorization: `Bearer ${paystackKey}` },
};

const initiateTransaction = async ({ body }) => {
  const response = await axios.post('https://api.paystack.co/transaction/initialize', body, headers);
  const data = response.data.data;
  const { authorization_url, access_code, reference } = data;
  return authorization_url;
};

const verifyPayment = async ({ reference }) => {
  const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, headers);
  return response.data.data;
};
module.exports = {
  initiateTransaction,
  verifyPayment,
};
