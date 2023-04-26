const {
  // ITEM INTERACTORS
  createItemInteractor,
  getItemInteractor,
  getQueryItemsInteractor,
  deleteItemByIdInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const createItem = async (req, res) => {
  try {
    const data = req.body;

    const item = await createItemInteractor(persistence, { ...data, store: req.auth.store, images: req.files });
    return res.status(201).json({ item });
  } catch (error) {
    console.error(error);
    handleErrorInteractor({ error, res });
  }
};

const getAllItemsForStore = async (req, res) => {
  try {
    const items = await getQueryItemsInteractor(persistence, { store: req.auth.store, query: req.query }, false);
    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const getItemForUser = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await getItemInteractor(persistence, { id }, true);
    return res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const { store } = req.auth;
    await deleteItemByIdInteractor(persistence, { id, storeName: store });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  createItem,
  getAllItemsForStore,
  getItemForUser,
  deleteById,
};
