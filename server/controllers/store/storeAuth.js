const jwt = require('jsonwebtoken');
const {
  // STORE INTERACRORS
  createStoreInteractor,
  storeLogin,
  // USER INTERACTORS
  createUserInteractor,
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
    // Extract body info
    const { email, storeName, password } = req.body;
    // Get the store
    const admin = await userLogin(persistence, { email, password });
    const store = await storeLogin(persistence, { storeName, email });

    // set the refresh and access tokens
    const tokens = await generateTokensInteractor(
      persistence,
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
    const { storeName, email, password, verPassword, product, brandColor } = req.body;
    // Create a new user or verify the current user
    const admin = await createUserInteractor(persistence, { email, password, verPassword });

    if (admin) {
      // create the store
      const { store, url } = await createStoreInteractor(persistence, { storeName, email, product, brandColor });

      // send response
      res.status(200).json({ success: true, admin: admin, store: store, url: url });
    }

    // @INFO: If there is no admin it will throw an error and it will be handled by the error handler
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleSignUp: handleSignUp,
  handleSignIn: handleSignIn,
};
