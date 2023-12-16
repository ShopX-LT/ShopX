const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(
  'sk_test_51MaoZ4Ke5JbG50qrIr7fo9pWTan7juloVcaENzOJVipV6yj4AJCFwM8Tf2qutcdFuixpmkArmnKwQQrzg9ccYIjX00SOCu6pG7'
);

const createCheckoutUrl = async ({ lineItems, userDetails, storeName }) => {
  // const domain = 'https://myshopx.net'
  const domain = 'http://localhost:4000';
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${domain}/${storeName}/payment-success`,
    cancel_url: `${domain}/${storeName}/home`,
    automatic_tax: { enabled: false },
    customer_email: userDetails.email,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
  });
  return session.url;
};

module.exports = {
  createCheckoutUrl,
};
