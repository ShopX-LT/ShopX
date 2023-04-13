const Store = require('../models/Store');

const createStore = async ({ storeName, email }) => {
  const newStore = new Store({
    name: storeName,
    owner: email,
    startDate: Date.now(),
    subscribers: [{ user: email, from: Date.now() }],
  });
  newStore.admin.push(email);
  const store = await newStore.save();
  return store;
};

const getStoreByName = async ({ storeName }) => {
  const store = await Store.findOne({ name: storeName });
  return store;
};

// The combination of store name and email is unique.Store name is unique and the it checks if the email provided is an admin
const getStoreByNameAndEmail = async ({ storeName, email }) => {
  const store = await Store.findOne({ name: storeName, admin: { $in: [email.toLowerCase()] } });
  return store;
};

const addCategoryToStore = async ({ store, categoryId }) => {
  store['categories'].push(categoryId);
  await store.save();
  return;
};

module.exports = {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
};
