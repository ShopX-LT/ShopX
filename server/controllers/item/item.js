const {
  // ITEM INTERACTORS
  createItemInteractor,
  getQueryItemsInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const createItem = async (req, res) => {
  try {
    const data = req.body;

    const item = await createItemInteractor({ persistence }, { ...data, store: req.auth.store, images: req.files });
    return res.status(201).json({ item });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await getQueryItemsInteractor({ persistence }, { store: req.auth.store, query: req.query });
    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  createItem,
  getAllItems,
};
