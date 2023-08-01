const axios = require('axios');

const sendSignUpEmail = async ({ email }) => {
  try {
    const body = { receiver: email };
    await axios.post(`https://myshopx.net/api/email/signup`, body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendSignUpEmail,
};
