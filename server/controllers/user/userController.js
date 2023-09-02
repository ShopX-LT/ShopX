const {
  // STORE INTERACTORE
  addVisitToStoreInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleStoreVisit = async (req, res) => {
  try {
    const store = req.header('store');
    const { isNewVisitor } = req.body;
    console.log(isNewVisitor);
    await addVisitToStoreInteractor(persistence, { storeName: store, isNewVisitor });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleStoreVisit,
};
