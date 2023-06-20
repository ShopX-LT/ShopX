/**
 * This module contains functions for interacting with the Store model in the database.
 */
const Store = require('../models/Store');

/**
 * Creates a new store with the given name and owner email.
 * @param {Object} options - The options object.
 * @param {string} options.storeName - The name of the new store.
 * @param {string} options.email - The email of the store owner.
 * @returns {Promise<Store>} A promise that resolves to the newly created store object.
 */
const createStore = async ({ storeName, email }) => {
  try {
    const newStore = new Store({
      name: storeName,
      owner: email,
      startDate: Date.now(),
      subscribers: [{ user: email, from: Date.now() }],
    });
    newStore.admin.push(email);
    const store = await newStore.save();
    return store;
  } catch (error) {
    console.error('Store Persistence error in createStore()', error);
    return null;
  }
};

/**
 * Finds a store in the database by its name.
 * @param {Object} options - An object containing the store name.
 * @param {string} options.storeName - The name of the store to find.
 * @returns {Promise<Store>} A promise that resolves to the store object if found, or null if not found.
 */
const getStoreByName = async ({ storeName }) => {
  try {
    const store = await Store.findOne({ name: storeName });
    return store;
  } catch (error) {
    console.error('Store Persistence error in getStoreByName()', error);
    return null;
  }
};

/**
 * Finds a store in the database by its name and email of the admin.
 * @param {Object} options - An object containing the store name and email of the admin.
 * @param {string} options.storeName - The name of the store to find.
 * @param {string} options.email - The email of the admin of the store.
 * @returns {Promise<Store>} A promise that resolves to the store object if found, or null if not found.
 */
const getStoreByNameAndEmail = async ({ storeName, email }) => {
  try {
    const store = await Store.findOne({ name: storeName, admin: { $in: [email.toLowerCase()] } });
    return store;
  } catch (error) {
    console.error('Store Persistence error in getStoreByNameAndEmail()', error);
    return null;
  }
};

/**
 * Adds a category ID to the store's list of categories and saves the store.
 * @param {Object} options - The options object.
 * @param {Object} options.store - The store object to add the category to.
 * @param {string} options.categoryId - The ID of the category to add to the store.
 * @returns None
 */
const addCategoryToStore = async ({ store, categoryId }) => {
  try {
    store['categories'].push(categoryId);
    await store.save();
    return true;
  } catch (error) {
    console.error('Store Persistence error in addCategoryToStore()', error);
    return null;
  }
};

/**
 * Adds a field to the store's item template and saves the store.
 * @param {Object} options - The options object.
 * @param {Object} options.store - The store to add the field to.
 * @param {Object} options.field - The field to add to the store's item template.
 * @returns None
 */
const addFieldToStore = async ({ store, field }) => {
  try {
    store.itemTemplate.push(field);
    await store.save();
    return;
  } catch (error) {
    console.error('Store Persistence error in addFieldToStore()', error);
    return null;
  }
};

const addOrderToStore = async ({ store, order }) => {
  try {
    store.orders.push(order._id);
    order.itemsOrdered.map((item) => {
      store.totalSales += item.quantity;
    });
    store.totalEarning += parseInt(order.total) * 0.9;
    store.wallet += parseInt(order.total) * 0.9;

    await store.save();
  } catch (error) {
    console.error('Store Persistence error in addOrderToStore()', error);
    return null;
  }
};

module.exports = {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
  addOrderToStore,
};
