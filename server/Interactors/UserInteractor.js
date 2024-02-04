const { sendSignUpEmail } = require('../services/EmailService');

const createUserInteractor = async (
  { getUser, verifyPassword, createUser, encryptPassword },
  { email, password, verPassword }
) => {
  //check if the user already has an account
  let user = await getUser({ email });

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

const subscribeToStoreInteractor = async (
  { getStoreByName, findOrderByReference, createUser, getUser, subscribeToStore },
  { storeName, reference, email }
) => {
  let userEmail = email;
  const store = await getStoreByName({ storeName });
  let user = await getUser({ email: userEmail });

  if (!store) return Promise.reject(new Error('Invalid Store'));
  if (!store.isProMember) return { data: false };
  if (reference) {
    const order = await findOrderByReference({ reference });
    if (!order) return Promise.reject(new Error('No order record'));
    userEmail = order.orderedBy;
  }

  if (!user) {
    user = await createUser({ email: userEmail });
    if (!user) return Promise.reject(new Error("Couldn't create new user"));
  }
  const data = await subscribeToStore({ user, storeName });
  if (!data) return Promise.reject(new Error('An error occured subscrbing'));

  return { data: data };
};

const formatUser = (user) => {
  return { email: user.email };
};

module.exports = {
  createUserInteractor,
  userLogin,
  subscribeToStoreInteractor,
};
