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
  try {
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
  } catch (error) {
    console.error('Item Persistence error in createItem()', error);
    return null;
  }
};

const getItemById = async ({ id }) => {
  try {
    const item = await Item.findById(id);
    return item;
  } catch (error) {
    console.error('Item Persistence error in getItemById()', error);
    return null;
  }
};

/**
 * @param {Array<Object>} inputItemsArray - An object that has the itemId and the quantity ordered
 */

const getGroupedItems = async (inputItemsArray) => {
  try {
    const rawItems = await Promise.all(
      inputItemsArray.map((obj) => {
        return Item.findById(obj.itemId);
      })
    );

    const items = rawItems.map((item, index) => {
      const quantity = inputItemsArray[index]?.quantity || 0;
      const dirtyItem = { ...item };
      const cleanItem = dirtyItem._doc;
      const updatedItem = { ...cleanItem, purchasedQuantity: quantity };
      return updatedItem;
    });

    return items;
  } catch (error) {
    console.error('Item Persistence error in getGroupedItems()', error);
    return null;
  }
};

/**
 * Retrieves items from the database based on the given query and store.
 * @param {Object} options - An object containing the query and store to search for items.
 * @param {string} options.query - The query to search for items.
 * @param {string} options.store - The store to search for items.
 * @returns {Promise<Array<Item>>} - A promise that resolves to an array of items that match the query and store.
 */
const getItemsByQuery = async ({ query, store }) => {
  try {
    const { category } = query;
    const items = await Item.find({
      store: store,
      category: category ? { $in: [category] } : { $exists: true, $ne: [] },
    }).exec();
    return items;
  } catch (error) {
    console.error('Item Persistence error in getItemsByQuery()', error);
    return null;
  }
};

const updateItemById = async ({ id, storeName, updatedItem }) => {
  try {
    const item = Item.findOneAndUpdate({ _id: id, store: storeName }, updatedItem, { new: true });
    return item;
  } catch (error) {
    console.error('Item Persistence error in updateItemById()', error);
    return null;
  }
};

const deleteItemById = async ({ id, storeName }) => {
  try {
    await Item.deleteOne({ _id: id, store: storeName });
  } catch (error) {
    console.error('Item Persistence error in deleteItemById()', error);
    return null;
  }
};

const updateItemQuanity = async ({ order }) => {
  try {
    await Promise.all(
      order.itemsOrdered.map(async (item) => {
        const itemToUpdate = await Item.findById(item.itemId);
        itemToUpdate.quantity -= item.quantity;
        await itemToUpdate.save();
      })
    );

    return;
  } catch (error) {
    console.error('Item Persistence error in updateItemQuanity()', error);
    return null;
  }
};

module.exports = {
  createItem,
  getItemsByQuery,
  getGroupedItems,
  getItemById,
  updateItemById,
  updateItemQuanity,
  deleteItemById,
};
