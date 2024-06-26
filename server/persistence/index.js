/**
 * This module exports functions for interacting with various data persistence layers.
 * Functions for interacting with store, user, item, category, and image data are included.
 * @module Persistence
 * @property {function} createStore - creates a new store
 * @property {function} getStoreByName - retrieves a store by name
 * @property {function} getStoreByNameAndEmail - retrieves a store by name and email
 * @property {function} addCategoryToStore - adds a category to a store
 * @property {function} addFieldToStore - adds a field to a store
 * @property {function} createUser - creates a new user
 * @property {function} getUser - retrieves a user by email
 */
const { createCategory, getManyCategories, deleteCategory } = require('./CategoryPersistence');
const { generateText } = require('./ChatGPTPersistence');
const { getAllColorSchemes, selectColorScheme } = require('./ColorSchemeUtils');
const {
  createItem,
  getItemById,
  getItemsBySearch,
  getItemsByQuery,
  getGroupedItems,
  updateItemImages,
  updateItemById,
  deleteItemById,
  updateItemStatistics,
  deleteImageFromItem,
  removeCategoryFromItems,
} = require('./ItemPersistence');

const { createOrder, findOrderByReference, getAllStoreOrders, updateOrder } = require('./OrderPersistence');
const { createPayout } = require('./PayoutPersistence');
const { createCheckoutUrl } = require('./StripePersistence');
const { initiateTransaction, verifyPayment, getBanks, createRecipient, transferOut } = require('./PaystackPersistence');
const { createReview, getProductReviews } = require('./ReviewPersistence');
const { createWebDesign, getStoreDesign, updateStoreDesign } = require('./WebDesignPersistence');

const {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
  addFieldValueToStore,
  addOrderToStore,
  editStoreWallet,
  addVisitToStore,
  updateStoreDeliveryFee,
  addOptionToStore,
  addOptionValueToStore,
} = require('./StorePersistence');
const {
  createUser,
  getUser,
  getUserByAdminToken,
  setAdminRefreshToken,
  removeAdminRefreshToken,
  subscribeToStore,
} = require('./UserPersistence');
//
const { saveImagesToS3Bucket, getImagesUrlFromS3Buscket } = require('./AWSPersistence');
const { encryptPassword, verifyPassword } = require('./EncryptionPersistence');

module.exports = {
  // CHATGPT PERSISTENCE
  generateText,

  // COLOR SCHEME
  getAllColorSchemes,
  selectColorScheme,

  // STORE PERSISTENCE
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
  addFieldValueToStore,
  addOrderToStore,
  editStoreWallet,
  addVisitToStore,
  updateStoreDeliveryFee,
  addOptionToStore,
  addOptionValueToStore,
  // USER PERSISTENCE
  createUser,
  getUser,
  subscribeToStore,
  getUserByAdminToken,
  setAdminRefreshToken,
  removeAdminRefreshToken,

  // ITEM PERSISTENCE
  createItem,
  getItemsBySearch,
  getItemsByQuery,
  getGroupedItems,
  getItemById,
  updateItemImages,
  updateItemById,
  deleteItemById,
  updateItemStatistics,
  deleteImageFromItem,
  removeCategoryFromItems,

  // CATEGORY PERSISTENCE
  createCategory,
  getManyCategories,
  deleteCategory,

  // ORDER PERSISTENCE
  createOrder,
  findOrderByReference,
  getAllStoreOrders,
  updateOrder,

  // PAYSTACK PERSISTENCE
  initiateTransaction,
  verifyPayment,
  getBanks,
  createRecipient,
  transferOut,

  // PAYOUT PERSISTENCE
  createPayout,

  // STRIPE PERSISTENCE
  createCheckoutUrl,

  //AWS PERSISTENCE
  saveImagesToS3Bucket,
  getImagesUrlFromS3Buscket,

  // ENCRYPTION PERSISTENCE
  verifyPassword,
  encryptPassword,

  // PAYSTACK PERSISTENCE
  initiateTransaction,
  verifyPayment,

  // REVIEW PERSISTENCE
  createReview,
  getProductReviews,

  // WEBDESIGN PERSISTENCE
  createWebDesign,
  getStoreDesign,
  updateStoreDesign,
};
