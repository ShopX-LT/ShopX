/**
 * This module exports a collection of interactors for various operations related to the store, user, item, category, token, and error.
 * @module interactors
 * @property {function} createStoreInteractor - A function that creates a store interactor.
 * @property {function} storeLogin - A function that logs in to the store.
 * @property {function} addFieldToStoreInteractor - A function that adds a field to the store interactor.
 * @property {function} getFieldFromStoreInteractor - A function that gets a field from the store interactor.
 * @property {function} getOrCreateUserInteractor - A function that gets or creates a user interactor.
 * @property {function}
 */
const {
  createStoreInteractor,
  storeLogin,
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
} = require('./StoreInteractor');
const { getOrCreateUserInteractor, userLogin } = require('./UserInteractor');
const { createItemInteractor, getQueryItemsInteractor } = require('./ItemInteractor');
const { createCategoryInteractor, getAllCategoriesInteractor } = require('./CategoryInteractor');
const { generateTokensInteractor, adminRefreshTokenInteractor, logoutInteractor } = require('./TokenInteractor');
const { handleErrorInteractor } = require('./ErrorInteractor');

module.exports = {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
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
