/**
 * A module that provides functions for creating and retrieving categories from the database.
 * @module categoryController
 */
const Category = require('../models/Category');

/**
 * Creates a new category in the database with the given name, store name, and creator's email.
 * @param {Object} categoryData - An object containing the data for the new category.
 * @param {string} categoryData.name - The name of the new category.
 * @param {string} categoryData.storeName - The name of the store the category belongs to.
 * @param {string} categoryData.creatorsEmail - The email of the creator of the category.
 * @returns {Promise<Category>} A promise that resolves to the newly created category object.
 */
const createCategory = async ({ name, storeName, creatorsEmail }) => {
  try {
    const newCategory = new Category({
      name: name,
      store: storeName,
      creatorsEmail: creatorsEmail,
    });

    const category = await newCategory.save();
    return category;
  } catch (error) {
    console.error('Category Persistence error in createCategory()', error);
    return null;
  }
};

/**
 * Retrieves multiple categories from the database based on their IDs.
 * @param {Object} categories - An object containing the IDs of the categories to retrieve.
 * @returns {Promise<Category>} A promise that resolves to an array of category objects.
 */
const getManyCategories = async ({ categories }) => {
  try {
    const result = await Category.find({ _id: { $in: categories } });
    return result;
  } catch (error) {
    console.error('Category Persistence error in getManyCategories()', error);
    return null;
  }
};

const deleteCategory = async ({ categoryId }) => {
  try {
    await Category.deleteOne({ _id: categoryId });
  } catch (error) {
    console.error('Category Persistence error in deleteCategory()', error);
    return null;
  }
};

module.exports = {
  createCategory,
  getManyCategories,
  deleteCategory,
};
