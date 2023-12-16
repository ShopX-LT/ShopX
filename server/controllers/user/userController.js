const {
  // STORE INTERACTORE
  addVisitToStoreInteractor,
  // USER
  subscribeToStoreInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleStoreVisit = async (req, res) => {
  try {
    const store = req.header('store');
    const { isNewVisitor } = req.body;
    await addVisitToStoreInteractor(persistence, { storeName: store, isNewVisitor });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleSubscribeToStore = async (req, res) => {
  try {
    const store = req.header('store');
    const { reference } = req.params;
    await subscribeToStoreInteractor(persistence, { storeName: store, reference });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleStoreVisit,
  handleSubscribeToStore,
};
