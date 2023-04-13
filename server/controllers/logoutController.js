const {
  // TOKEN INTERACTORS
  logoutInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../Interactors/index');
const persistence = require('../persistence/index');

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    await logoutInteractor({ persistence }, { cookies, res });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = { handleLogout };
