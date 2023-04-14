const {
  createStore,
  getStoreByName,
  getStoreByNameAndEmail,
  addCategoryToStore,
  addFieldToStore,
} = require('./StorePersistence');
const { createUser, getUser, getUserByAdminToken } = require('./UserPersistence');
const { createItem, getItemsByQuery } = require('./ItemPersistence');
const { createCategory, getManyCategories } = require('./CategoryPersistence');
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

  // CATEGORY PERSISTENCE
  createCategory,
  getManyCategories,

  //AWS PERSISTENCE
  saveImagesToS3Bucket,

  // ENCRYPTION PERSISTENCE
  verifyPassword,
  encryptPassword,
};
