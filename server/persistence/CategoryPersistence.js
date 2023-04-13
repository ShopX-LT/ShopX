const Category = require('../models/Category');

const createCategory = async ({ name, storeName, creatorsEmail }) => {
  const newCategory = new Category({
    name: name,
    store: storeName,
    creatorsEmail: creatorsEmail,
  });

  const category = await newCategory.save();
  return category;
};

module.exports = {
  createCategory,
};
