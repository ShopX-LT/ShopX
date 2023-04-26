const jwt = require('jsonwebtoken');
const {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  // USER INTERACTORS
  getOrCreateUserInteractor,
  userLogin,
  // TOKEN INTERACTORS
  generateTokensInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');

const persistence = require('../../persistence/index');

// LOG INTO A STORE
const handleSignIn = async (req, res) => {
  try {
    console.log(req);
    // Extract body info
    const { email, storeName, password } = req.body;
    // Get the store
    const store = await storeLogin(persistence, { storeName, email });

    const admin = await userLogin(persistence, { email, password });

    // set the refresh and access tokens
    const tokens = generateTokensInteractor(
      { tokenizer: jwt },
      { adminEmail: admin.email, storeName: store.name, res: res }
    );

    // send response
    res.status(200).json({ token: tokens, admin: admin, store: store });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

//CREATE A STORE
const handleSignUp = async (req, res) => {
  try {
    const { storeName, email, password } = req.body;

    // Create a new user or verify the current user
    const admin = await getOrCreateUserInteractor(persistence, { email, password });

    // create the store
    const store = await createStoreInteractor(persistence, { storeName, email });

    // set the refresh and access tokens
    const tokens = generateTokensInteractor(
      { tokenizer: jwt },
      { adminEmail: admin.email, storeName: store.name, res: res }
    );

    // send response
    res.status(200).json({ token: tokens, admin: admin, store: store });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleSignUp: handleSignUp,
  handleSignIn: handleSignIn,
};
