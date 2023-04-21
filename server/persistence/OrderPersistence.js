/**
 * This module contains functions for interacting with the Order model in the database.
 */
const Order = require('../models/Order');

/**
 * Finds all the orders made to a store.
 * @param {Object} options - An object containing the store name.
 * @param {string} options.storeName - The name of the store to find.
 * @returns {Promise<Array<Order>>} A promise that resolves to an array of the store orders.
 */
const getAllStoreOrders = async ({ storeName }) => {
  const orders = await Order.find({ store: storeName }).exec();
  return orders;
};

module.exports = {
  getAllStoreOrders,
};
