const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
  rating: {
    type: Number,
    require: true,
    trim: true,
  },
  date: Date,
});

module.exports = mongoose.model('Review', ReviewSchema);

ReviewSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase(); // convert email to lowercase
  next();
});
ReviewSchema.post('findOne', function (result) {
  if (result) {
    if (result.email) {
      result.email = result.email.toLowerCase(); // convert email to lowercase
    }
  }
});
ReviewSchema.post('find', function (result) {
  if (result) {
    if (result.email) {
      result.email = result.email.toLowerCase(); // convert email to lowercase
    }
  }
});
