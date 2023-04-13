const getOrCreateUserInteractor = async (
  { getUser, verifyPassword, createUser, encryptPassword },
  { email, password }
) => {
  //check if the user already has an account
  let user = await getUser({ email });
  if (!user) {
    const encryptedPassword = encryptPassword(password);
    user = await createUser({ email, encryptedPassword });
  } else {
    verifyPassword({ password: user.password, userInput: password });
  }
  user = formatUser(user);
  return user;
};

const userLogin = async ({ getUser, verifyPassword }, { email, password }) => {
  //check if the user already has an account
  let user = await getUser({ email });
  if (!user) {
    throw new Error(`This User does not exist`);
  }
  verifyPassword({ password: user.password, userInput: password });
  user = formatUser(user);
  return user;
};

const formatUser = (user) => {
  return { email: user.email };
};

module.exports = {
  getOrCreateUserInteractor,
  userLogin,
};
