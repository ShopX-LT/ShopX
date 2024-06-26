/**
 * This module exports a collection of interactors for various operations related to the store, user, item, category, token, and error.
 * @module interactors
 * @property {function} createStoreInteractor - A function that creates a store interactor.
 * @property {function} storeLogin - A function that logs in to the store.
 * @property {function} addOptionToStoreInteractor - A function that adds a field to the store interactor.
 * @property {function} getFieldFromStoreInteractor - A function that gets a field from the store interactor.
 * @property {function} createUserInteractor - A function that gets or creates a user interactor.
 * @property {function}
 */
const {
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
  deleteCategoryInteractor,
} = require('./CategoryInteractor');
const {
  createItemInteractor,
  getItemInteractor,
  getSearchItemsInteractor,
  getQueryItemsInteractor,
  updateItemImagesInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
  deleteImageFromItemInteractor,
} = require('./ItemInteractor');
const { handleErrorInteractor } = require('./ErrorInteractor');

const { getStoreOrdersInteractor, updateOrderInteractor } = require('./OrderInteractor');
const {
  initTransactionInteractor,
  verifyPaymentInteractor,
  payoutInteractor,
  getBanksInteractors,
  createCheckout,
} = require('./PaystackInteractor');
const { getItemReviewsInteractor, createReviewInteractor } = require('./ReviewInteractor');
const {
  createStoreInteractor,
  storeLogin,
  addOptionToStoreInteractor,
  getOptionsForStoreInteractor,
  addOptionsValueInteractor,
  getFieldFromStoreInteractor,
  getStoreStatsInteractor,
  checkStoreNameInteractor,
  addVisitToStoreInteractor,
  updateStoreDeliveryFeeInteractor,
} = require('./StoreInteractor');
const { generateTokensInteractor, adminRefreshTokenInteractor, logoutInteractor } = require('./TokenInteractor');
const { createUserInteractor, userLogin, subscribeToStoreInteractor } = require('./UserInteractor');
const {
  getStoreDesignInteractor,
  updateStoreDesignInteractor,
  getAllColorSchemesInteractor,
} = require('./WebDesignInteractor');

module.exports = {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  addOptionToStoreInteractor,
  getOptionsForStoreInteractor,
  addOptionsValueInteractor,
  getFieldFromStoreInteractor,
  getStoreStatsInteractor,
  checkStoreNameInteractor,
  addVisitToStoreInteractor,
  updateStoreDeliveryFeeInteractor,
  // USER INTERACTORS
  createUserInteractor,
  userLogin,
  subscribeToStoreInteractor,
  //ITEM INTERACTORS
  createItemInteractor,
  getItemInteractor,
  getSearchItemsInteractor,
  getQueryItemsInteractor,
  updateItemImagesInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
  deleteImageFromItemInteractor,

  // CATEGORY INTERCATORS
  createCategoryInteractor,
  getAllCategoriesInteractor,
  getCustomCategoriesInteractor,
  deleteCategoryInteractor,
  // ORDER INTERACTORS
  getStoreOrdersInteractor,
  updateOrderInteractor,
  // PAYSTACK INTERACTORS
  initTransactionInteractor,
  verifyPaymentInteractor,
  payoutInteractor,
  getBanksInteractors,
  createCheckout,
  // REVIEW INTERACTORS
  getItemReviewsInteractor,
  createReviewInteractor,
  // TOKEN INTERACTORS
  generateTokensInteractor,
  adminRefreshTokenInteractor,
  logoutInteractor,
  // WEBDESIGN INTERACTOR
  getStoreDesignInteractor,
  updateStoreDesignInteractor,
  getAllColorSchemesInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
};
