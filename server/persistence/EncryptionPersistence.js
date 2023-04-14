const bcrypt = require('bcrypt');
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash(password, salt);
  return pwdHash;
};

const verifyPassword = ({ password, userInput }) => {
  const isMatch = bcrypt.compare(password, userInput);
  if (!isMatch) throw new Error('Invalid password');
  return true;
};

module.exports = {
  encryptPassword,
  verifyPassword,
};
