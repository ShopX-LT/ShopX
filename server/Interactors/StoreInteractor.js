const _ = require('lodash');
/**
 * Creates a new store interactor with the given store name and email.
 * @param {Object} persistence.getStore - A function that retrieves a store object from the database.
 * @param {Object} persistence.createStore - A function that creates a new store object in the database.
 * @param {string} storeName - The name of the store to create.
 * @param {string} email - The email associated with the store.
 * @returns An object containing the newly created store object.
 * @throws An error if the store already exists.
 */
const createStoreInteractor = async (
  { getStoreByName, createStore, createWebDesign, generateText },
  { storeName, email, product, brandColor }
) => {
  // check if the store name already exists
  const lowerCaseStoreName = _.toLower(storeName);
  const store = await getStoreByName({ storeName: lowerCaseStoreName });

  if (store) return Promise.reject(new Error('Store already exists'));

  const newStore = await createStore({ storeName: lowerCaseStoreName, email });
  // create the website
  const { mainText, subText } = await generateText({ product });
  if (!mainText && !subText) {
    return Promise.reject(new Error('Error creating website'));
  }
  const webDesign = await createWebDesign({ mainText, subText, brandColor, storeName: newStore.name });
  if (!webDesign) {
    return Promise.reject(new Error('Error creating website'));
  }

  const formattedStore = formatStore(newStore);
  return { store: formattedStore, url: `https://${formattedStore.name}.myshopx.net` };
};

const getStoreStatsInteractor = async ({ getStoreByName }, { storeName }) => {
  const store = await getStoreByName({ storeName });
  if (!store) return Promise.reject(new Error('Invalid Store'));

  const formattedStore = formatStore(store);
  return formattedStore;
};

/**
 * Stores the login information for a given store and email.
 * @param {function} persistence.getStoreByNameAndEmail - A function that retrieves a store by name and email.
 * @param {object} storeName - The name of the store to log in to.
 * @param {string} email - The email address to use for logging in.
 * @returns {object} - The formatted store object.
 * @throws {Error} - If the store is invalid.
 */
const storeLogin = async ({ getStoreByNameAndEmail }, { storeName, email }) => {
  const lowerCaseStoreName = _.toLower(storeName);

  const store = await getStoreByNameAndEmail({ storeName: lowerCaseStoreName, email });
  if (!store) {
    return Promise.reject(new Error('Invalid store'));
  }
  const formattedStore = formatStore(store);
  return formattedStore;
};

/**
 * Adds a option to a store and returns the updated item template.
 * @param {Object} persistence.addoptionToStore - The function that adds a option to a store.
 * @param {Object} persistence.getStoreByName - The function that retrieves a store by name.
 * @param {string} persistence.storeName - The name of the store to add the option to.
 * @param {Object} persistence.option - The option to add to the store.
 * @returns {Object} The updated item template of the store.
 * @throws {Error} If the store name is invalid.
 */
const addOptionToStoreInteractor = async ({ addOptionToStore, getStoreByName }, { storeName, option }) => {
  const store = await getStoreByName({ storeName });
  const newFeature = _.toLower(option);
  if (!store) return Promise.reject(new Error('Invalid store'));
  const doesFeatureAlreadyExist = store.options.some((optionElement) => optionElement.feature === newFeature);
  if (!doesFeatureAlreadyExist) await addOptionToStore({ store, newFeature });
  return store.options;
};

const getOptionsForStoreInteractor = async ({ getStoreByName }, { storeName }) => {
  const store = await getStoreByName({ storeName });
  if (!store) return Promise.reject(new Error('Invalid store'));
  return store.options;
};

const addOptionsValueInteractor = async ({ addOptionValueToStore, getStoreByName }, { storeName, feature, value }) => {
  const store = await getStoreByName({ storeName });
  const newValue = _.toLower(value);
  if (!store) return Promise.reject(new Error('Invalid store'));
  await addOptionValueToStore({ store, feature, newValue });
  return store.options;
};

// vvvvvvvvvvv TAKE THIS OUT WHEN OPTIONS FEATURE IS READY vvvvvvvv
/**
 * Retrieves the item template field from the store with the given name.
 * @param {object} persistence - An object containing the getStoreByName function.
 * @param {function} persistence.getStoreByName - A function that retrieves a store by name.
 * @param {object} param1 - An object containing the name of the store to retrieve.
 * @param {string} param1.storeName - The name of the store to retrieve.
 * @returns The item template field of the store with the given name.
 * @throws An error if the store with the given name does not exist.
 */
const getFieldFromStoreInteractor = async ({ getStoreByName }, { storeName }) => {
  const store = await getStoreByName({ storeName });
  if (!store) return Promise.reject(new Error('Invalid store'));
  return store.itemTemplate;
};
// ^^^^^^^^^^^^^^ TAKE THIS OUT WHEN OPTIONS FEATURE IS READY ^^^^^^^^^^^^^^

const addVisitToStoreInteractor = async ({ addVisitToStore, getStoreByName }, { storeName, isNewVisitor }) => {
  const store = await getStoreByName({ storeName });
  if (!store) return Promise.reject(new Error('Invalid store'));
  const isUpdated = await addVisitToStore({ store, isNewVisitor });
  if (!isUpdated) Promise.reject(new Error('Error updating visits'));
  return;
};

/**
 *
 * @param {*} store
 * @returns
 */

const checkStoreNameInteractor = async ({ getStoreByName }, { storeName }) => {
  const blackList = ['error', 'api', 'home'];
  if (blackList.includes(storeName.toLowerCase())) {
    return false;
  }
  const store = await getStoreByName({ storeName }, true);
  if (store === 'an error occurred') {
    return Promise.reject(new Error('An error occured on the server'));
  }
  if (store) {
    return false;
  }
  return true;
};

const updateStoreDeliveryFeeInteractor = async ({ updateStoreDeliveryFee }, { storeName, update }) => {
  const { deliveryFee } = update;
  const updatedStore = await updateStoreDeliveryFee({ storeName, deliveryFee });
  if (!updatedStore) {
    throw new Error('Failed to update Store Delivery Fee');
  }
  return updatedStore.deliveryFee;
};

const formatStore = (store) => {
  return {
    name: store?.name,
    wallet: store?.wallet,
    categories: store?.categories,
    itemTemplate: store?.itemTemplate,
    // STATISTICS
    // earnings
    totalEarning: store?.totalEarning, //all time earnings made on the app
    weeklyEarning: store?.weeklyEarning,
    weeklyEarningHistory: store?.weeklyEarningHistory,
    dailyEarning: store?.dailyEarning,
    dailyEarningHistory: store?.dailyEarningHistory,
    // sales
    totalSales: store?.totalSales, //all time earnings made on the app
    weeklySales: store?.weeklySales,
    weeklySalesHistory: store?.weeklySalesHistory,
    dailySales: store?.dailySales,
    dailySalesHistory: store?.dailySalesHistory,
    // Visits
    totalVisits: store?.totalVisits, //all time earnings made on the app
    weeklyVisits: store?.weeklyVisits,
    weeklyVisitsHistory: store?.weeklyVisitsHistory,
    dailyVisits: store?.dailyVisits,
    dailyVisitsHistory: store?.dailyVisitsHistory,
  };
};

module.exports = {
  createStoreInteractor,
  getStoreStatsInteractor,
  storeLogin,
  addOptionToStoreInteractor,
  getOptionsForStoreInteractor,
  addOptionsValueInteractor,
  getFieldFromStoreInteractor,
  checkStoreNameInteractor,
  addVisitToStoreInteractor,
  updateStoreDeliveryFeeInteractor,
};
