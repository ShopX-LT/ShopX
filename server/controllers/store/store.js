/**
 * Contains two functions for handling HTTP requests related to adding and getting fields from a store.
 * @module FieldHandlers
 */
const {
  // STORE INTERACTORS
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
  getStoreStatsInteractor,
  //ORDER INTERACTORS
  getStoreOrdersInteractor,
  updateOrderInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
  // PAYSTACK INTERACTORS
  payoutInteractor,
  getBanksInteractors,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

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
    res.status(200).json({ stats });
  } catch (error) {
    console.error(error);

    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleAddField,
  handleGetField,
  handleGetAllOrders,
  handleUpdateOrder,
  handlePayout,
  handleGetBankList,
  handleGetStoreStats,
};
