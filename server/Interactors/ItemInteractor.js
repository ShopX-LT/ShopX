/**
 * Creates an item with the given parameters.
 * @param {Object} persistence - An object containing the necessary functions to create an item.
 * @param {Function} persistence.createItem - The function to create an item.
 * @param {Function} persistence.getStoreByName - The function to get a store by its name.
 * @param {Function} persistence.saveImagesToS3Bucket - The function to save images to an S3 bucket.
 * @param {Object} - An object containing the necessary parameters to create an item.
 * @param {string} title - The title of the item.
 * @param {number} price - The price of the item.
 * @param {string} store - The name of the store the
 * @returns {Object} - the newly created object
 */
const createItemInteractor = async (
  { createItem, getStoreByName, saveImagesToS3Bucket },
  { title, price, store, description, discount, category, images, quantity, reviews }
) => {
  const validStore = await validateStore(getStoreByName, store);
  const savedImages = await saveImagesToS3Bucket(images);
  if (!savedImages) {
    throw new Error('Error saving images');
  }
  const item = await createItem({
    title,
    price,
    store: validStore,
    description,
    discount,
    category,
    images: savedImages,
    quantity,
    reviews,
  });

  const formattedItem = formatItemForStore(item);
  return formattedItem;
};

const getItemInteractor = async ({ getItemById }, { id }, user) => {
  const rawItem = await getItemById({ id });
  if (!rawItem) {
    throw new Error('Item not found');
  }
  const item = user ? formatItemForUser(rawItem) : formatItemForStore(rawItem);
  return item;
};

/**
 * Retrieves items from a store based on a given query and formats them.
 * @param {Object} persistence- An object containing functions to retrieve items by query and store name.
 * @param {Function} persistence.getItemsByQuery - A function that retrieves items from a store based on a given query.
 * @param {Function} persistence.getStoreByName - A function that retrieves a store by name.
 * @param {Object} - An object containing the name of the store and the query to retrieve items.
 * @param {string} store - The name of the store to retrieve items from.
 * @param {Object} query - The query to use to retrieve items.
 * @returns {Array} - An array of formatted items.
 */
const getQueryItemsInteractor = async ({ getItemsByQuery, getStoreByName }, { store, query }, user) => {
  const validStore = await validateStore(getStoreByName, store);
  const items = await getItemsByQuery({ query, store: validStore });

  let formattedItems;
  if (user) {
    formattedItems = items.map((item) => {
      return formatItemForUser(item);
    });
  } else {
    formattedItems = items.map((item) => {
      return formatItemForStore(item);
    });
  }

  return formattedItems;
};

/**
 * Validates the given store by checking if it exists in the database.
 * @param {function} getStoreByName - The function to retrieve a store by name from the database.
 * @param {string} store - The name of the store to validate.
 * @returns {object} - The validated store object.
 * @throws {Error} - If the store is not found in the database.
 */
const validateStore = async (getStoreByName, store) => {
  const validStore = await getStoreByName({ storeName: store });
  if (!validStore) {
    throw new Error(`Invalid store`);
  }
  return validStore;
};

const deleteItemByIdInteractor = async ({ deleteItemById }, { id, storeName }) => {
  await deleteItemById({ id, storeName });
};

/**
 * Formats an item object by extracting specific properties and calculating the display price.
 */
const formatItemForStore = (item) => {
  return {
    id: item?._id,
    title: item?.title,
    price: item?.price,
    category: item?.category,
    imagePath: item?.imagePath,
    amount: item?.amount,
    discount: item?.discount,
    quantity: item?.quantity,
    displayPrice: item?.price * (1 - item.discount / 100),
  };
};
const formatItemForUser = (item) => {
  return {
    id: item?._id,
    title: item?.title,
    price: item?.price,
    category: item?.category,
    imagePath: item?.imagePath,
    amount: item?.amount,
    discount: item?.discount,
    quantity: item?.quantity,
    displayPrice: item?.price * (1 - item.discount / 100),
  };
};

module.exports = {
  createItemInteractor,
  getItemInteractor,
  getQueryItemsInteractor,
  deleteItemByIdInteractor,
};
