const _ = require('lodash');

/**
 * Formats a category object to only include the id and name properties.
 * @param {Object} category - The category object to format.
 * @returns {Object} - The formatted category object with only id and name properties.
 */
const formatCategory = (category) => {
  return { id: category.id, name: category.name, store: category.store, creatorsEmail: category.creatorsEmail };
};

/**
 * Creates a new category and adds it to the specified store.
 * @param {Object} persistence - An object containing the necessary persistence for the function.
 * @param {Function} persistence.addCategoryToStore - A function that adds a category to a store.
 * @param {Function} persistence.getStoreByNameAndEmail - A function that retrieves a store by name and email.
 * @param {Function} persistence.createCategory - A function that creates a new category.
 * @param {Object} options - An object containing the necessary options for the function.
 * @param {string} options.storeName - The name of the store to add the category to.
 * @param {string} options.email - The email of the user creating
 * @returns {Promise<Category>} A promise that resolves to all the categories in the store.
 *
 */
const createCategoryInteractor = async (
  { addCategoryToStore, getStoreByNameAndEmail, createCategory },
  { storeName, email, category }
) => {
  try {
    // find the store
    const store = await getStoreByNameAndEmail({ storeName, email });
    if (!store) {
      return Promise.reject(new Error('Invalid store'));
    }

    //   create the category
    const newCategory = await createCategory({
      name: category,
      storeName: store.name,
      creatorsEmail: email,
    });
    if (!newCategory) {
      return Promise.reject(new Error('Error creating new category'));
    }

    //   add the category to the store
    const isSaved = await addCategoryToStore({ store, categoryId: newCategory._id });
    if (!isSaved) {
      return Promise.reject(new Error('Error saving new category'));
    }

    return newCategory;
  } catch (error) {
    console.log('Category Interact error in createCategoryInteractor()', error);
    return null;
  }
};

/**
 * Retrieves all categories for a given store and formats them for display.
 * @param {Object} getStoreByNameAndEmail - A function that retrieves a store by name and email.
 * @param {Object} getManyCategories - A function that retrieves multiple categories.
 * @param {string} storeName - The name of the store to retrieve categories for.
 * @param {string} email - The email associated with the store.
 * @returns {Array} An array of formatted category objects.
 * @throws {Error} If the store is invalid.
 */
const getAllCategoriesInteractor = async ({ getStoreByName, getManyCategories }, { storeName }) => {
  try {
    // find the store
    const store = await getStoreByName({ storeName });
    if (!store) {
      return Promise.reject(new Error('Invalid store'));
    }
    const categories = await getManyCategories({ categories: store['categories'] });
    if (!categories) {
      return Promise.reject(new Error('Error retrieving categories'));
    }
    //   only send relevant fields
    const formattedCategories = categories.map((category) => {
      return formatCategory(category);
    });

    return formattedCategories;
  } catch (error) {
    console.log('Category Interact error in getAllCategoriesInteractor()', error);
    return null;
  }
};

const getCustomCategoriesInteractor = async ({ getStoreByName }, { storeName }) => {
  const store = await getStoreByName({ storeName });
  if (!store) return Promise.reject(new Error('Invalid store'));
  return store.options;
};

const deleteCategoryInteractor = async (
  { deleteCategory, getManyCategories, removeCategoryFromItems },
  { storeName, categoryId }
) => {
  try {
    const store = _.toLower(storeName);
    const categoryToBeDeleted = await getManyCategories({ categories: [categoryId] });

    if (!categoryToBeDeleted || categoryToBeDeleted.lenght === 0) {
      return Promise.reject(new Error('Error retrieving categories'));
    }
    await deleteCategory({ categoryId });
    await removeCategoryFromItems({ storeName: store, category: categoryToBeDeleted[0].name });
  } catch (error) {
    console.log('Category Interactor error in deleteCategoryInteractor()', error);
    return null;
  }
};

// const editCategoryInteractor = async ({ editCategoryInItems }, { storeName, oldCategory, newCategory }) => {
//   try {
//     const store = _.toLower(storeName)
//     const categoryToBeEdited = _.toLower(oldCategory)
//     const newCategoryValue = _.toLower(oldCategory)

//   } catch (error) {
//     console.log('Category Interactor error in deleteCategoryInteractor()', error);
//     return null;
//   }
// };

module.exports = {
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
  deleteCategoryInteractor,
};
