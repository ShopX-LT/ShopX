const Item = require('../models/Item');

const getAllItems = async ({ storeName }) => {
  try {
    const databaseQuery = { store: storeName };
    const items = await Item.find(databaseQuery).exec();
    return items;
  } catch (error) {
    console.error('Item Persistence error in getAllItems()', error);
    return null;
  }
};

module.exports = {
  getAllItems,
};
