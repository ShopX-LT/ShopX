const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: String,
      trim: true,
    },
    itemsOrdered: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        title: String,
        quantity: Number,
        price: Number,
        paid: Number,
        discount: Number,
      },
    ],
    //   STORE DETAILS
    store: String,
    status: {
      type: String,
      enum: ['cancelled', 'delivered', 'in transit', 'pending', 'ready'],
      default: 'pending',
    },
    total: Number,
    subTotal: Number,

    // DELIVERY DETAILS
    dateOrdered: Date,
    dateDelivered: Date,
    deliveryFee: { type: Number, default: 1500 },
    deliveryAddress: {},
    billingAddress: {},

    //PAYMENT DETAILS
    reference: String,
    ip_address: String,
    fees: Number,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
