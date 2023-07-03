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
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
} = require('./CategoryInteractor');
const {
  createItemInteractor,
  getItemInteractor,
  getQueryItemsInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
} = require('./ItemInteractor');
const { handleErrorInteractor } = require('./ErrorInteractor');

const { getStoreOrdersInteractor, updateOrderInteractor } = require('./OrderInteractor');
const {
  initTransactionInteractor,
  verifyPaymentInteractor,
  payoutInteractor,
  getBanksInteractors,
} = require('./PaystackInteractor');
const {
  createStoreInteractor,
  storeLogin,
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
  getStoreStatsInteractor,
} = require('./StoreInteractor');
const { generateTokensInteractor, adminRefreshTokenInteractor, logoutInteractor } = require('./TokenInteractor');
const { getOrCreateUserInteractor, userLogin } = require('./UserInteractor');

module.exports = {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
  getStoreStatsInteractor,
  // USER INTERACTORS
  getOrCreateUserInteractor,
  userLogin,
  //ITEM INTERACTORS
  createItemInteractor,
  getItemInteractor,
  getQueryItemsInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
  // CATEGORY INTERCATORS
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
  // ORDER INTERACTORS
  getStoreOrdersInteractor,
  updateOrderInteractor,
  // PAYSTACK INTERACTORS
  initTransactionInteractor,
  verifyPaymentInteractor,
  payoutInteractor,
  getBanksInteractors,
  // TOKEN INTERACTORS
  generateTokensInteractor,
  adminRefreshTokenInteractor,
  logoutInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
};
