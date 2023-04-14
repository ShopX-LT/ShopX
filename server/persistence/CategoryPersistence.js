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

const getManyCategories = async ({ categories }) => {
  const result = await Category.find({ _id: { $in: categories } });
  return result;
};

module.exports = {
  createCategory,
  getManyCategories,
};
