const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 15,
      required: true,
      trim: true,
    },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    store: { type: String },
    creatorsEmail: { type: String },
  },
  { timestamps: true }
);

CategorySchema.pre('save', function (next) {
  this.name = this.name.toLowerCase(); // convert name to lowercase

  next();
});

module.exports = mongoose.model('Category', CategorySchema);
