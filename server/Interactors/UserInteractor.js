const { sendSignUpEmail } = require('../services/EmailService');

const getOrCreateUserInteractor = async (
  { getUser, verifyPassword, createUser, encryptPassword },
  { email, password, verPassword, accountType }
) => {
  //check if the user already has an account
  let user = await getUser({ email });

  if (accountType === 'new') {
    if (!user) {
      if (password !== verPassword) {
        return Promise.reject(new Error(`Passwords do not match`));
      }
      const encryptedPassword = await encryptPassword(password);

      user = await createUser({ email, password: encryptedPassword });

      await sendSignUpEmail({ email });
      user = formatUser(user);
      return user;
    } else {
      return Promise.reject(new Error(`This account already exist`));
    }
  } else if (accountType === 'old') {
    if (user) {
      const isPasswordValid = await verifyPassword({ password: user.password, userInput: password });
      if (!isPasswordValid) return Promise.reject(new Error(`Invalid Password`));
      user = formatUser(user);
      return user;
    } else {
      return Promise.reject(new Error(`This account does not exist`));
    }
  }
  return Promise.reject(new Error(`Invalid store creation details`));
};

const userLogin = async ({ getUser, verifyPassword }, { email, password }) => {
  //check if the user already has an account

  let user = await getUser({ email });
  if (!user) {
    return Promise.reject(new Error(`This User does not exist`));
  }

  const isPasswordValid = await verifyPassword({ password: user.password, userInput: password });

  if (!isPasswordValid) return Promise.reject(new Error(`Invalid Password`));
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
