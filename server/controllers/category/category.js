const {
  // CATEGORY INTERACRORS
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

//create a new category for a store
// create the category and add it to the stores list of categories
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { admin, store } = req.auth;
    const categories = await createCategoryInteractor(persistence, { storeName: store, email: admin, category: name });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

// get all the categories created by a store
const getCategory = async (req, res) => {
  try {
    const { admin, store } = req.auth;
    const categories = await getAllCategoriesInteractor(persistence, { storeName: store });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};
// get all the categories created by a store for their website
const getCategoryForUsers = async (req, res) => {
  try {
    const store = req.header('store');
    const categories = await getAllCategoriesInteractor(persistence, { storeName: store });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const getCustomCategories = async (req, res) => {
  try {
    const store = req.header('store');
    const fields = await getCustomCategoriesInteractor(persistence, { storeName: store });

    return res.status(200).json(fields);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  createCategory: createCategory,
  getCategory: getCategory,
  getCategoryForUsers,
  getCustomCategories,
};
