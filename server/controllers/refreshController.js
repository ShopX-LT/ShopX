const jwt = require('jsonwebtoken');
const {
  // TOKEN INTERACTORS
  adminRefreshTokenInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../Interactors/index');

const persistence = require('../persistence/index');

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    const token = await adminRefreshTokenInteractor(persistence, { tokenizer: jwt, cookies });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    // handleErrorInteractor(error, res);
  }
};

module.exports = { handleRefreshToken };
