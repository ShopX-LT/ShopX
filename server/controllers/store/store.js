/**
 * Contains two functions for handling HTTP requests related to adding and getting fields from a store.
 * @module FieldHandlers
 */
const {
  // STORE INTERACTORS
  addOptionToStoreInteractor,
  getOptionsForStoreInteractor,
  addOptionsValueInteractor,
  getStoreStatsInteractor,
  checkStoreNameInteractor,
  updateStoreDeliveryFeeInteractor,
  //ORDER INTERACTORS
  getStoreOrdersInteractor,
  updateOrderInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
  // PAYSTACK INTERACTORS
  payoutInteractor,
  getBanksInteractors,
  // WEBDESIGN INTERACTORS
  getStoreDesignInteractor,
  updateStoreDesignInteractor,
  getAllColorSchemesInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

// vvvvvvvvvvv TAKE THIS OUT WHEN OPTIONS FEATURE IS READY vvvvvvvv
/**
 * Handles the addition of a new field to a store.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error adding the field to the store.
 */
const handleAddField = async (req, res) => {
  try {
    const { store } = req.auth;
    const newField = req.body.field;
    const fields = await addFieldToStoreInteractor(persistence, { storeName: store, field: newField });
    res.status(200).json({ fields: fields });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

/**
 * Handles a GET request for a field from the store.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 */
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

// ^^^^^^^^^^^^^^^^^ TAKE THIS OUT WHEN OPTIONS FEATURE IS READY ^^^^^^^^^^^^^^^^^

/**
 * Handles the addition of a new feature to a store.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error adding the feature to the store.
 */
const handleAddFeature = async (req, res) => {
  try {
    const { store } = req.auth;
    const newfeature = req.body.feature;
    const options = await addOptionToStoreInteractor(persistence, { storeName: store, option: newfeature });
    res.status(200).json({ options: options });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

/**
 * Handles a GET request for the options from the store.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 */
const handleGetOptions = async (req, res) => {
  try {
    const { store } = req.auth;
    const options = await getOptionsForStoreInteractor(persistence, { storeName: store });
    res.status(200).json({ options: options });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};
const handleAddFeatureValue = async (req, res) => {
  try {
    const { store } = req.auth;
    const feature = req.body.feature;
    const newValue = req.body.value;
    const options = await addOptionsValueInteractor(persistence, { storeName: store, feature, value: newValue });
    res.status(200).json({ options: options });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const storeName = req.auth?.store;
    const orders = await getStoreOrdersInteractor(persistence, { storeName });
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetBankList = async (req, res) => {
  try {
    const banks = await getBanksInteractors(persistence);
    return res.status(200).json({ banks });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

const handleUpdateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { store } = req.auth;
    const updatedOrder = req.body;
    const order = await updateOrderInteractor(persistence, { id, storeName: store, updatedOrder });
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handlePayout = async (req, res) => {
  try {
    const { name, account_number, bank } = req.body;
    const { store, admin } = req.auth; //check if admin is part of store employees
    const payout = await payoutInteractor(persistence, { storeName: store, name, account_number, bank, admin });
    res.status(200).json({ payout });
  } catch (error) {
    console.log(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetStoreStats = async (req, res) => {
  try {
    const storeName = req.auth?.store;
    const stats = await getStoreStatsInteractor(persistence, { storeName });
    return res.status(200).json({ stats });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleCheckStoreName = async (req, res) => {
  try {
    const { storeName } = req.body;
    const isValid = await checkStoreNameInteractor(persistence, { storeName });
    return res.status(200).json({ isValid });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetStoreName = async (req, res) => {
  try {
    const storename = req.auth?.store;
    return res.status(200).json({ storename });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetDesign = async (req, res) => {
  try {
    const storeName = req.auth?.store;
    const design = await getStoreDesignInteractor(persistence, { storeName });
    return res.status(200).json(design);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleUpdateDesign = async (req, res) => {
  try {
    const storeName = req.auth?.store;
    const update = req.body;
    const design = await updateStoreDesignInteractor(persistence, { storeName, update });
    return res.status(200).json(design);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleSetDeliveryFee = async (req, res) => {
  try {
    const storeName = req.auth?.store;
    const update = req.body;
    const deliveryFee = await updateStoreDeliveryFeeInteractor(persistence, { storeName, update });
    return res.status(200).json(deliveryFee);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetAllColorSchemes = async (req, res) => {
  try {
    const baseColor = req.params.baseColor;
    const colorSchemes = await getAllColorSchemesInteractor(persistence, { baseColor });
    return res.status(200).json(colorSchemes);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};
module.exports = {
  handleAddField,
  handleGetField,
  handleAddFeatureValue,
  handleAddFeature,
  handleGetOptions,
  handleGetAllOrders,
  handleUpdateOrder,
  handlePayout,
  handleGetBankList,
  handleGetStoreStats,
  handleCheckStoreName,
  handleGetDesign,
  handleUpdateDesign,
  handleSetDeliveryFee,
  handleGetAllColorSchemes,
  handleGetStoreName,
};
