const mongoose = require("mongoose");
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
    products: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
    payoutHistory: [{ type: Schema.Types.ObjectId, ref: "Payout" }],
    keywords: [String],
    startDate: Date,
    isActive: Boolean,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    itemTemplate: [String],

    wallet: {
      type: String,
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
    totalEarning: Number, //all time earnings made on the app
    weeklyEarning: Number,
    weeklyEarningHistory: [Number],
    dailyEarning: Number,
    dailyEarningHistory: [Number],
    // sales
    totalSales: Number, //all time earnings made on the app
    weeklySales: Number,
    weeklySalesHistory: [Number],
    dailySales: Number,
    dailySalesHistory: [Number],
    // Visits
    totalVisits: Number, //all time earnings made on the app
    weeklyVisits: Number,
    weeklyVisitsHistory: [Number],
    dailyVisits: Number,
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
StoreSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase(); // convert name to lowercase
  this.owner = this.owner.toLowerCase(); // convert owner to lowercase

  next();
});
StoreSchema.post("findOne", function (result) {
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

module.exports = mongoose.model("Store", StoreSchema);
