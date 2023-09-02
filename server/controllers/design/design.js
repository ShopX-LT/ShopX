const persistence = require('../../persistence/index');
const {
  // WEBDESIGN INTERACTORS
  getStoreDesignInteractor,

  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');

const getStoreDesign = async (req, res) => {
  try {
    const store = req.params.store;
    const design = await getStoreDesignInteractor(persistence, { storeName: store });
    return res.status(200).json(design);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  getStoreDesign,
};
