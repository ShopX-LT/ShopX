const Category = require('../../models/Category');
const Store = require('../../models/Store');
const { formatCategory } = require('../utils/formats');

//create a new category for a store
// create the category and add it to the stores list of categories
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { admin, store } = req.auth;
    const shop = await Store.findOne({ name: store });
    const category = new Category({
      name: name,
      store: shop.name,
      creatorsEmail: admin,
    });
    await category.save();
    // add the category to the stores category
    shop['categories'].push(category._id);
    await shop.save();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error(error);
  }
};

// get all the categories created by a store
const getCategory = async (req, res) => {
  try {
    const { admin, store } = req.auth;
    const categories = await Category.find({ store: store }).exec();
    const formattedCategories = categories.map((category) => {
      return formatCategory(categories);
    });
    return res.status(200).json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error(error);
  }
};

module.exports = {
  createCategory: createCategory,
  getCategory: getCategory,
};
