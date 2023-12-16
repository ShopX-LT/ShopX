const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    owner: {
      //email
      type: String,
      required: true,
      trim: true,
    },
    admin: [String], // email
    products: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
    payoutHistory: [{ type: Schema.Types.ObjectId, ref: 'Payout' }],
    keywords: [String],
    startDate: Date,
    isActive: Boolean,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    itemTemplate: [String],
    itemTemplateValue: {
      type: Object,
      default: {},
    },
    deliveryFee: { type: Number, default: 1500 },
    isProMember: Boolean,

    wallet: {
      type: Number,
      default: 0,
    },
    // SETTINGS
    settings: {
      deliveryFee: Number,
      deliveryWindow: Number,
    },

    // AUTO PAYOUTS
    accountNumber: {
      type: Number,
      trim: true,
    }, //encrypt this
    accountName: {
      type: String,
      trim: true,
    },
    bankCode: {
      type: Number,
      trim: true,
    },

    // STATISTICS
    // earnings
    totalEarning: {
      type: Number,
      default: 0,
    }, //all time earnings made on the app
    weeklyEarning: {
      type: Number,
      default: 0,
    },
    weeklyEarningHistory: [Number],
    dailyEarning: {
      type: Number,
      default: 0,
    },
    dailyEarningHistory: [Number],
    // sales
    totalSales: {
      type: Number,
      default: 0,
    }, //all time earnings made on the app
    weeklySales: {
      type: Number,
      default: 0,
    },
    weeklySalesHistory: [Number],
    dailySales: {
      type: Number,
      default: 0,
    },
    dailySalesHistory: [Number],
    // Visits
    totalVisits: {
      type: Number,
      default: 0,
    },
    newVisit: {
      type: Number,
      default: 0,
    },
    weeklyVisits: {
      type: Number,
      default: 0,
    },
    weeklyVisitsHistory: [Number],
    dailyVisits: {
      type: Number,
      default: 0,
    },
    dailyVisitsHistory: [Number],
    // subscribers
    subscribers: [
      {
        user: String,
        from: Date,
      },
    ],
  },
  { timestamps: true }
);
StoreSchema.pre('save', function (next) {
  this.name = this.name.toLowerCase(); // convert name to lowercase
  this.owner = this.owner.toLowerCase(); // convert owner to lowercase

  next();
});
StoreSchema.post('findOne', function (result) {
  if (result) {
    if (result.name) {
      result.name = result.name.toLowerCase(); // convert name to lowercase
    }
    if (result.owner) {
      result.owner = result.owner.toLowerCase(); // convert owner to lowercase
    }
    if (result.admin) {
      result.admin = result.admin.map((interest) => interest.toLowerCase()); // convert admins array to lowercase
    }
  }
});

module.exports = mongoose.model('Store', StoreSchema);
