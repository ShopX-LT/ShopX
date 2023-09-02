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

const getBanks = async () => {
  try {
    const banks = {};
    const response = await axios.get(`https://api.paystack.co/bank?country=nigeria&currency=NGN&type=nuban`, {
      headers,
    });
    response.data.data.map((bank) => {
      banks[bank.name] = bank.code;
    });
    return banks;
  } catch (error) {
    console.log('getBanks: ', error);
    return null;
  }
};

const createRecipient = async ({ recipientDetails }) => {
  try {
    const response = await axios.post(`https://api.paystack.co/transferrecipient`, recipientDetails, headers);
    return response;
  } catch (error) {
    console.log('createRecipient: ', error);
    return null;
  }
};

const transferOut = async ({ transferDetails }) => {
  try {
    // const response = await axios.post(`https://api.paystack.co/transfer`, transferDetails, headers);
    const response = await axios.post(`https://api.paystack.co`, transferDetails, headers);
    return response;
  } catch (error) {
    console.log('transferOut: ', error);
    return null;
  }
};
module.exports = {
  initiateTransaction,
  verifyPayment,
  getBanks,
  createRecipient,
  transferOut,
};
