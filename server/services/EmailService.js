const axios = require('axios');

const sendSignUpEmail = async ({ email }) => {
  try {
    const body = { receiver: email };
    await axios.post(`https://myshopx.net/api/email/signup`, body);
  } catch (error) {
    console.log(error);
  }
};

const sendNewOrderEmail = async (order, receiverEmail) => {
  const body = {
    storeName: order.store,
    receiver: receiverEmail,
    totalPrice: order.subTotal,
    items: order.itemsOrdered,
  };
  try {
    await axios.post(`https://myshopx.net/api/email/new-order`, body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendSignUpEmail,
  sendNewOrderEmail,
};
