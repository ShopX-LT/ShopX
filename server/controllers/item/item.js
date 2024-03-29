const {
  // ITEM INTERACTORS
  createItemInteractor,
  getItemInteractor,
  getSearchItemsInteractor,
  getQueryItemsInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
  deleteImageFromItemInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
  updateItemImagesInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const createItem = async (req, res) => {
  try {
    const data = req.body;
    const itemData = { ...data, store: req.auth.store, images: req.files };

    const item = await createItemInteractor(persistence, itemData);
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

const getAllItemsForUser = async (req, res) => {
  try {
    const store = req.header('store');
    const items = await getQueryItemsInteractor(persistence, { store: store, query: req.query }, true);
    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleSearch = async (req, res) => {
  try {
    const store = req.header('store');
    const { searchParam } = req.params;

    const items = await getSearchItemsInteractor(persistence, { storeName: store, searchParam }, true);
    return res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const updateItemImages = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await updateItemImagesInteractor(persistence, { id, images: req.files });
    res.status(201).send(item);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const deleteItemImage = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const imageId = req.params.imageId;
    await deleteImageFromItemInteractor(persistence, { itemId, imageId });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const updateItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const { store } = req.auth;
    const updatedItem = req.body;
    const item = updateItemByIdInteractor(persistence, { id, storeName: store, updatedItem });
    res.status(201).send(item);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
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
  handleSearch,
  updateItemImages,
  deleteItemImage,
  updateItemById,
  deleteById,
  getAllItemsForUser,
};
