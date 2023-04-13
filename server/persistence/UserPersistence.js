const User = require('../models/User');

const createUser = async ({ email, password }) => {
  const user = new User({
    email,
    password,
  });

  return await user.save();
};

const getUser = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};
const getUserByAdminToken = async ({ adminRefreshToken }) => {
  const user = await User.findOne({ adminRefreshToken: adminRefreshToken });
  return user;
};

module.exports = { createUser, getUser, getUserByAdminToken };
