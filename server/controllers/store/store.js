/**
 * Contains two functions for handling HTTP requests related to adding and getting fields from a store.
 * @module FieldHandlers
 */
const {
  // STORE INTERACTORS
  addFieldToStoreInteractor,
  getFieldFromStoreInteractor,
  //ORDER INTERACTORS
  getStoreOrdersInteractor,
  updateOrderInteractor,
  // ERROR INTERACTORS
  handleErrorInteractor,
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
    console.log(store);
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

const handleUpdateOrder = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const { store } = req.auth;
    const updatedOrder = req.body;
    const order = updateOrderInteractor(persistence, { id, storeName: store, updatedOrder });
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = { handleAddField, handleGetField, handleGetAllOrders, handleUpdateOrder };
