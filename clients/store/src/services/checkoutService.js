const CREATE_ORDER_URL = '/api/order/checkout';
const VERIFY_PAYMENT_URL = '/api/order/verify-payment';

export async function createOrder(axios, cart, form) {
  try {
    const body = { items: cart, userDetails: form };
    const response = await axios.post(CREATE_ORDER_URL, body);

    return response.data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function verifyPayment(axios, reference) {
  try {
    const body = { reference };
    const response = await axios.post(VERIFY_PAYMENT_URL, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
