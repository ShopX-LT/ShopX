/**
 * This module contains functions for interacting with the Order model in the database.
 */
const Order = require('../models/Order');

const createOrder = async ({ details }) => {
  try {
    const newOrder = new Order(details);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    console.error('Order Persistence error in createOrder()', error);
    return null;
  }
};

const findOrderByReference = async ({ reference }) => {
  try {
    return await Order.findOne({ reference });
  } catch (error) {
    console.error('Order Persistence error in findOrderByReference()', error);
    return null;
  }
};

/**
 * Finds all the orders made to a store.
 * @param {Object} options - An object containing the store name.
 * @param {string} options.storeName - The name of the store to find.
 * @returns {Promise<Array<Order>>} A promise that resolves to an array of the store orders.
 */
const getAllStoreOrders = async ({ storeName }) => {
  try {
    const orders = await Order.find({ store: storeName }).exec();
    return orders;
  } catch (error) {
    console.error('Order Persistence error in getAllStoreOrders()', error);
    return null;
  }
};

module.exports = {
  createOrder,
  findOrderByReference,
  getAllStoreOrders,
};
