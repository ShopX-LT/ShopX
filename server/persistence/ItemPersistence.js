/**
 * This module contains functions for interacting with the Item model.
 */
const Item = require('../models/Item');

/**
 * Creates a new item object with the given properties and saves it to the database.
 * @param {Object} itemData - An object containing the properties of the item.
 * @param {string} itemData.title - The title of the item.
 * @param {number} itemData.price - The price of the item.
 * @param {string} itemData.store - The store where the item is sold.
 * @param {string} itemData.description - A description of the item.
 * @param {number} itemData.discount - The discount percentage for the item.
 * @param {string} itemData.category - The category of the item.
 * @param {Array<string>} itemData.images - An array of image
 * @returns {Promise<Item>} A promise that resolves to the newly created category object.
 *
 */
const createItem = async ({ title, price, store, description, discount, category, images, quantity, reviews }) => {
  const newItem = new Item({
    title,
    price,
    store,
    description,
    discount,
    category,
    images,
    quantity,
    reviews,
  });
  const item = await newItem.save();
  return item;
};

/**
 * Retrieves items from the database based on the given query and store.
 * @param {Object} options - An object containing the query and store to search for items.
 * @param {string} options.query - The query to search for items.
 * @param {string} options.store - The store to search for items.
 * @returns {Promise<Array<Item>>} - A promise that resolves to an array of items that match the query and store.
 */
const getItemsByQuery = async ({ query, store }) => {
  const { category } = query;
  const items = await Item.find({
    store: store,
    category: category ? { $in: [category] } : { $exists: true, $ne: [] },
  }).exec();
  return items;
};

module.exports = {
  createItem,
  getItemsByQuery,
};
