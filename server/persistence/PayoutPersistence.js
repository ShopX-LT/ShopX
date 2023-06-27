const Payout = require('../models/Payout');

const createPayout = async ({ details, storeName, admin }) => {
  const payout = new Payout({
    reference: details.reference,
    amount: details.amount,
    recipient_code: details.recipient,
    byWho: admin,
    store: storeName,
  });
  await payout.save();
  return payout;
};

module.exports = {
  createPayout,
};
