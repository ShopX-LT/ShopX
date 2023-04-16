const Item = require('../models/Item');

/* This function creates a new item in the database
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
