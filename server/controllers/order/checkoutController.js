const {
  // PAYSTACK INTERACTORS
  initTransactionInteractor,
  verifyPaymentInteractor,
  createCheckout,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleCheckout = async (req, res) => {
  try {
    let url = null;
    const storeName = req.header('store');
    const type = req.params?.paymentType;
    const { items, userDetails } = req.body;
    if (type === 'stripe') {
      url = await createCheckout(persistence, { items, storeName, userDetails });
    } else {
      url = await initTransactionInteractor(persistence, { items, userDetails });
    }
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};
const handleverifyPayment = async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    const { reference } = req.body;
    await verifyPaymentInteractor(persistence, { reference });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleCheckout,
  handleverifyPayment,
};
