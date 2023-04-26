const {
  // PAYSTACK INTERACTORS
  initTransactionInteractor,
  verifyPaymentInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleCheckout = async (req, res) => {
  try {
    const { items, userDetails } = req.body;
    const url = await initTransactionInteractor(persistence, { items, userDetails });
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};
const handleverifyPayment = async (req, res) => {
  try {
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
