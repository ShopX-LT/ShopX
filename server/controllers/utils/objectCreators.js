const User = require("../../models/User");
const Store = require("../../models/Store");

// Create a new user
const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash(password, salt);
  const newUser = new User({
    email: email,
    password: pwdHash,
  });
  return await newUser.save();
};

// create a new store
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
module.exports = {
  createUser: createUser,
  createStore: createStore,
};
