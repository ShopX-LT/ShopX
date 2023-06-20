/**
 * A module for encrypting and verifying passwords using bcrypt.
 * @module bcryptUtils
 */
const bcrypt = require('bcrypt');
/**
 * Encrypts a password using bcrypt.
 * @param {string} password - The password to be encrypted.
 * @returns {Promise<string>} A promise that resolves to the encrypted password hash.
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash(password, salt);
  return pwdHash;
};

/**
 * Verifies if the user input matches the hashed password using bcrypt.
 * @param {Object} options - An object containing the password and userInput to verify.
 * @param {string} options.password - The hashed password to compare against.
 * @param {string} options.userInput - The user input to compare against the hashed password.
 * @returns {boolean} - Returns true if the user input matches the hashed password.
 * @throws {Error} - Throws an error if the user input does not match the hashed password.
 */
const verifyPassword = async ({ password, userInput }) => {
  const isMatch = await bcrypt.compare(password, userInput);
  return isMatch;
};

module.exports = {
  encryptPassword,
  verifyPassword,
};
