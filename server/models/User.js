const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: 5,
    },
    username: {
      type: String,
      max: 15,
      trim: true,
    },
    address: {
      addressLine1: String,
      addressLine2: String,
      state: String,
      city: String,
      country: String,
    },
    phone_no: Number,
    orderlist: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
        store: String,
      },
    ],
    wishlist: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        store: String,
      },
    ],
    cart: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        quantity: Number,
        store: String,
      },
    ],
    cartTotal: {
      amount: String,
      store: String,
    },
    viewed: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        store: String,
      },
    ],
    reviews: [mongoose.SchemaTypes.ObjectId],
  },
  { timestamp: true }
);

UserSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase(); // convert email to lowercase
  next();
});
UserSchema.post('findOne', function (result) {
  if (result) {
    if (result.email) {
      result.email = result.email.toLowerCase(); // convert email to lowercase
    }
  }
});
UserSchema.post('find', function (result) {
  if (result) {
    if (result.email) {
      result.email = result.email.toLowerCase(); // convert email to lowercase
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
