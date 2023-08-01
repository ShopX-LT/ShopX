const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      trim: true,
    },
    store: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    category: [String],
    images: [String],
    quantity: {
      type: Number,
      default: 0,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
      trim: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

    //STATISTICS
    views: [Number],
    viewsWeeklyHistory: [Number],
    likes: Number,
    viewIpAddresses: [String],
    salesIpAddresses: [String],
    sales: Number,
  },
  { strict: false }
);

module.exports = mongoose.model('Item', ItemSchema);
