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
const { createItem, getItemsByQuery, getGroupedItems } = require('./ItemPersistence');
const { getAllStoreOrders } = require('./OrderPersistence');
const {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
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

  // USER PERSISTENCE
  createUser,
  getUser,
  getUserByAdminToken,

  // ITEM PERSISTENCE
  createItem,
  getItemsByQuery,
  getGroupedItems,

  // CATEGORY PERSISTENCE
  createCategory,
  getManyCategories,

  // ORDER PERSISTENCE
  getAllStoreOrders,

  //AWS PERSISTENCE
  saveImagesToS3Bucket,

  // ENCRYPTION PERSISTENCE
  verifyPassword,
  encryptPassword,
};
