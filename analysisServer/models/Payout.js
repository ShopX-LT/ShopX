const mongoose = require('mongoose');

const PayoutSchema = new mongoose.Schema(
  {
    reference: String,
    transfer_code: String,
    recipient_code: String,
    details: Object,
    amount: Number,
    store: String,
    byWho: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Payout', PayoutSchema);
