const jwt = require('jsonwebtoken');
const {
  // USER INTERACTORS
  createUserInteractor,
  userLogin,
  // TOKEN INTERACTORS
  generateTokensInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');

const persistence = require('../../persistence/index');

const handleUserSignUp = async (req, res) => {
  try {
    const { email, password, verPassword } = req.body;
    // Create a new user or verify the current user
    const admin = await createUserInteractor(persistence, { email, password, verPassword });

    if (admin) {
      // set the refresh and access tokens
      const tokens = generateTokensInteractor(
        { tokenizer: jwt },
        { adminEmail: admin.email, storeName: null, res: res }
      );

      // send response
      res.status(200).json({ token: tokens, admin: admin });
    }
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleUserSignIn = async (req, res) => {
  try {
    // Extract body info
    const { email, password } = req.body;
    // Get the store
    const admin = await userLogin(persistence, { email, password });

    // set the refresh and access tokens
    const tokens = await generateTokensInteractor(
      persistence,
      { tokenizer: jwt },
      { adminEmail: admin.email, storeName: null, res: res }
    );

    // send response
    res.status(200).json({ token: tokens, admin: admin });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleUserSignUp: handleUserSignUp,
  handleUserSignIn: handleUserSignIn,
};
