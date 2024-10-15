const axios = require('axios');
import numeral from 'numeral';

function fCurrency(number) {
  const format = number ? numeral(number).format(`0,0.00`) : '0';

  return result(`₦ ${format}`, '.00');
}

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
    items: order.itemsOrdered,
    orderedBy: order.orderedBy,
    currency: '₦',
    subTotal: `${fCurrency(order.subTotal / 100)}`,
    total: `${fCurrency(order.total / 100)}`,
    order: order,
  };
  try {
    await axios.post(`https://myshopx.net/api/email/new-order`, body);
    // await axios.post(`http://127.0.0.1:8000/api/email/new-order`, body);
  } catch (error) {
    console.log(error);
  }
};

const updateOrderEmail = async (order) => {
  const body = {
    storeName: order.store,
    receiver: order.orderedBy,
    items: order.itemsOrdered,
    orderedBy: order.orderedBy,
    status: order.status,
    currency: '₦',
    subTotal: `${fCurrency(order.subTotal / 100)}`,
    total: `${fCurrency(order.total / 100)}`,
    order: order,
  };
  try {
    await axios.post(`https://myshopx.net/api/email/update-order`, body);
    // await axios.post(`http://127.0.0.1:8000/api/email/update-order`, body);
  } catch (error) {
    console.log(error);
  }
};

const sendNewVisitEmail = async () => {
  try {
    await axios.get(`https://myshopx.net/api/email/newvisit`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendSignUpEmail,
  sendNewOrderEmail,
  sendNewVisitEmail,
  updateOrderEmail,
};
