const {
  // STORE INTERACTORS
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleAddField = async (req, res) => {
  try {
    const { store } = req.auth;
    console.log(store);
    const newField = req.body.field;
    const fields = await addFieldToStoreInteractor(persistence, { storeName: store, field: newField });
    res.status(200).json({ fields: fields });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetField = async (req, res) => {
  try {
    const { store } = req.auth;
    const fields = await getFieldFromStoreInteractor(persistence, { storeName: store });
    res.status(200).json({ fields });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = { handleAddField, handleGetField };
