const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Store = require('../../models/Store');
const User = require('../../models/User');
const { createStore, createUser } = require('../utils/objectCreators');
const { formatStore, formatUser } = require('../utils/formats');

// CREATE A NEW STORE
const handleSignUp = async (req, res) => {
  try {
    // Extract body info
    const { email, storeName, password } = req.body;

    // check if the store name already exists
    const store = await Store.findOne({ name: storeName });

    // let the user know that name is in use
    if (store) {
      return res.status(400).json({
        message: 'This store name already exists',
      });
    }

    //check if the user already has an account
    let user = await User.findOne({ email: email });

    // if the person is not already a user, create a new user else, verify the users password
    if (user === null) {
      user = await createUser(email, password);
    } else {
      //if it is a registered user verify their password
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: 'Password is incorrect. Use your account password',
        });
    }

    const newStore = await createStore(storeName, user);
    // values that will be embedded in token
    const verification = {
      admin: user.email,
      store: newStore.name,
    };
    //create the token
    const token = createToken(verification);
    if (!token) {
      return res.status(500).json({ message: 'Internal error' });
    }
    setRefreshToken(verification, res);

    // formate for the frontend
    const formattedAdmin = formatUser(user);
    const formattedStore = formatStore(newStore);
    //send
    return res.status(200).json({ token, formattedAdmin, formattedStore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};

//LOGIN
const handleSignIn = async (req, res) => {
  try {
    const { storeName, email, password } = req.body;
    //get the store and check if it exists
    const store = await Store.findOne({ name: storeName });
    if (store === null) {
      return res.status(400).json({ message: 'Please ensure you have the right store name' });
    }

    // check that the user is an admin for that store
    if (!store.admin.includes(email.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    // get the user
    const admin = await User.findOne({ email: email });
    if (admin === null)
      return res.status(400).json({
        message: 'User does not exist. Verify that you hsve the right email address',
      });

    // verify the password
    const isMatch = bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Password is incorrect' });
    const verification = {
      admin: admin.email,
      store: store.name,
    };
    // create token
    const token = createToken(verification);
    if (!token) {
      return res.status(500).json({ message: 'Internal error' });
    }
    setRefreshToken(verification, res);
    const formattedAdmin = formatUser(admin);
    const formattedStore = formatStore(store);

    res.status(200).json({ token, formattedAdmin, formattedStore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const createToken = (verification) => {
  let token;
  try {
    token = jwt.sign(verification, process.env.JWT_SECRET, { expiresIn: '15m' });
  } catch (error) {
    console.error(error);
  }
  return token;
};
const setRefreshToken = (verification, res) => {
  let token;
  try {
    token = jwt.sign(verification, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
    res.cookie('refreshToken', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleSignUp: handleSignUp,
  handleSignIn: handleSignIn,
};
