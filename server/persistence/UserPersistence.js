/**
 * A module that provides functions for creating and retrieving user data from the database.
 * @module userController
 */
const User = require('../models/User');

/**
 * Creates a new user with the given email and password.
 * @param {Object} user - An object containing the user's email and password.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @returns {Promise<User>} A promise that resolves with the newly created user object.
 */
const createUser = async ({ email, password }) => {
  try {
    const user = new User({
      email,
      password,
    });

    return await user.save();
  } catch (error) {
    console.error('User Persistence error in createUser()', error);
    return null;
  }
};

/**
 * Finds a user in the database with the given email address.
 * @param {Object} param - An object containing the email address of the user to find.
 * @param {string} param.email - The email address of the user to find.
 * @returns {Promise<User>} A promise that resolves to the user object if found, or null if not found.
 */
const getUser = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error('User Persistence error in getUser()', error);
    return null;
  }
};

/**
 * Finds a user in the database by their admin refresh token.
 * @param {Object} adminRefreshToken - The admin refresh token of the user to find.
 * @returns {Promise<User>} A promise that resolves with the user object if found, or null if not found.
 */
const getUserByAdminToken = async ({ adminRefreshToken }) => {
  try {
    const user = await User.findOne({ adminRefreshToken: adminRefreshToken });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('User Persistence error in getUserByAdminToken()', error);
    return null;
  }
};

const subscribeToStore = async ({ storeName, user }) => {
  try {
    user.subscribedTo.push(storeName);
    await user.save();
    return true;
  } catch (error) {
    console.error('User Persistence error in subscribeToStore()', error);
    return null;
  }
};

const setAdminRefreshToken = async ({ email, refreshToken }) => {
  try {
    const update = { $set: { adminRefreshToken: refreshToken } };
    const user = await User.findOneAndUpdate({ email }, update, { new: true });
  } catch (error) {
    console.error('User Persistence error in setAdminRefreshToken()', error);
    return null;
  }
};
const removeAdminRefreshToken = async ({ refreshToken }) => {
  const update = { adminRefreshToken: '' };
  const user = await User.findOneAndUpdate({ adminRefreshToken: refreshToken }, update, { new: true });
};

module.exports = {
  createUser,
  getUser,
  subscribeToStore,
  getUserByAdminToken,
  setAdminRefreshToken,
  removeAdminRefreshToken,
};
