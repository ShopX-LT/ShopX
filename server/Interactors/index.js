const { createStoreInteractor, storeLogin } = require('./StoreInteractor');
const { getOrCreateUserInteractor, userLogin } = require('./UserInteractor');
const { createItemInteractor, getQueryItemsInteractor } = require('./ItemInteractor');
const { createCategoryInteractor, getAllCategoriesInteractor } = require('./CategoryInteractor');
const { generateTokensInteractor, adminRefreshTokenInteractor, logoutInteractor } = require('./TokenInteractor');
const { handleErrorInteractor } = require('./ErrorInteractor');

module.exports = {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  // USER INTERACTORS
  getOrCreateUserInteractor,
  userLogin,
  //ITEM INTERACTORS
  createItemInteractor,
  getQueryItemsInteractor,
  // CATEGORY INTERCATORS
  createCategoryInteractor,
  getAllCategoriesInteractor,
  // TOKEN INTERACTORS
  generateTokensInteractor,
  adminRefreshTokenInteractor,
  logoutInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
};
