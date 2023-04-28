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
const { createCategory, getManyCategories } = require('./CategoryPersistence');
const {
  createItem,
  getItemById,
  getItemsByQuery,
  getGroupedItems,
  updateItemById,
  deleteItemById,
  updateItemQuanity,
} = require('./ItemPersistence');
const { createOrder, findOrderByReference, getAllStoreOrders } = require('./OrderPersistence');
const { createPayout } = require('./PayoutPersistence');
const { initiateTransaction, verifyPayment, getBanks, createRecipient, transferOut } = require('./PaystackPersistence');
const {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
  addOrderToStore,
  editStoreWallet,
} = require('./StorePersistence');
const { createUser, getUser, getUserByAdminToken } = require('./UserPersistence');
//
const { saveImagesToS3Bucket } = require('./AWSPersistence');
const { encryptPassword, verifyPassword } = require('./EncryptionPersistence');

module.exports = {
  // STORE PERSISTENCE
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
  addOrderToStore,
  editStoreWallet,

  // USER PERSISTENCE
  createUser,
  getUser,
  getUserByAdminToken,

  // ITEM PERSISTENCE
  createItem,
  getItemsByQuery,
  getGroupedItems,
  getItemById,
  updateItemById,
  deleteItemById,
  updateItemQuanity,

  // CATEGORY PERSISTENCE
  createCategory,
  getManyCategories,

  // ORDER PERSISTENCE
  createOrder,
  findOrderByReference,
  getAllStoreOrders,

  // PAYSTACK PERSISTENCE
  initiateTransaction,
  verifyPayment,
  getBanks,
  createRecipient,
  transferOut,

  // PAYOUT PERSISTENCE
  createPayout,

  //AWS PERSISTENCE
  saveImagesToS3Bucket,

  // ENCRYPTION PERSISTENCE
  verifyPassword,
  encryptPassword,
};
