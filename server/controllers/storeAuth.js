const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Store = require("../models/Store");
const User = require("../models/User");

// CREATE A NEW STORE
const signUp = async (req, res) => {
  try {
    // Extract body info
    const { email, storeName, password } = req.body;

    // check if the store name already exists
    const store = await Store.findOne({ name: storeName });

    // let the user know that name is in use
    if (store) {
      return res.status(400).json({
        message: "This store name already exists. Please pick a different name",
      });
    }

    //check if the user already has an account
    let user = await User.findOne({ email: email });

    // if the person is not already a user, create a new user else, verify the users password
    if (user === null) {
      user = await createUser(email, password);
    } else {
      //if it is a registered user verify their password
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Password is incorrect. Use your account password",
        });
    }
    const newStore = await createStore(storeName, user);
    // values that will be embedded in token
    const verification = {
      admin: user.email,
      store: newStore.name,
    };
    const token = jwt.sign(verf, process.env.JWT_SECRET);
    const formattedAdmin = formatUser(user);
    const formattedStore = formatStore(store);
    return res.status(200).json({ token, formattedAdmin, formattedStore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash(password, salt);
  const newUser = new User({
    email: email,
    password: pwdHash,
  });
  return await newUser.save();
};

const formatUser = (user) => {
  return { email: user.email };
};
const createStore = async (storeName, user) => {
  const newStore = new Store({
    name: storeName,
    owner: user.email,
    startDate: Date.now(),
    subscribers: [{ user: user.email, from: Date.now() }],
  });
  newStore.admin.push(user.email);
  const store = await newStore.save();

  user.sbuscribedTo.push(savedStore.name);
  user.save();

  return store;
};
const formatStore = (store) => {
  return {
    name: store.name,
    wallet: store.wallet,
    categories: store.categories,
    itemTemplate: store.itemTemplate,
    // STATISTICS
    // earnings
    totalEarning: store.totalEarning, //all time earnings made on the app
    weeklyEarning: store.weeklyEarning,
    weeklyEarningHistory: store.weeklyEarningHistory,
    dailyEarning: store.dailyEarning,
    dailyEarningHistory: store.dailyEarningHistory,
    // sales
    totalSales: store.totalSales, //all time earnings made on the app
    weeklySales: store.weeklySales,
    weeklySalesHistory: store.weeklySalesHistory,
    dailySales: store.dailySales,
    dailySalesHistory: store.dailySalesHistory,
    // Visits
    totalVisits: store.totalVisits, //all time earnings made on the app
    weeklyVisits: store.weeklyVisits,
    weeklyVisitsHistory: store.weeklyVisitsHistory,
    dailyVisits: store.dailyVisits,
    dailyVisitsHistory: store.dailyVisitsHistory,
  };
};
module.exports = {
  signUp: signUp,
};
