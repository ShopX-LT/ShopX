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
  { createItem, getStoreByName, saveImagesToS3Bucket, addFieldValueToStore },
  itemData
) => {
  try {
    const { store, images } = itemData;
    const validStore = await validateStore(getStoreByName, store);
    await handleFieldValues(addFieldValueToStore, { store: validStore, item: itemData });

    const savedImages = await saveImagesToS3Bucket(images);
    if (!savedImages) {
      return Promise.reject(new Error('Error saving images'));
    }

    const item = await createItem({
      ...itemData,
      store: validStore.name,
      images: savedImages,
    });

    const formattedItem = formatItemForStore(item);
    return formattedItem;
  } catch (error) {
    console.log('Item Interact error in createItemInteractor()', error);
    return null;
  }
};

const handleFieldValues = async (addFieldValueToStore, { store, item }) => {
  const fields = store.itemTemplate;

  for (const field of fields) {
    const fieldValue = item[field];
    const value = fieldValue ? fieldValue.toLowerCase() : null;
    if (value && !store.itemTemplateValue[field].includes(value)) {
      store.itemTemplateValue[field].push(value);
    }
  }
  await addFieldValueToStore({ store });
};

const getItemInteractor = async ({ getItemById, getImagesUrlFromS3Buscket }, { id }, user) => {
  const rawItem = await getItemById({ id });
  if (!rawItem) {
    return Promise.reject(new Error('Item not found'));
  }
  const imagesUrl = await getImagesUrlFromS3Buscket({ images: rawItem.images });
  if (!imagesUrl) {
    return Promise.reject(new Error('Error retrieving Images'));
  }
  const item = user ? formatItemForUser(rawItem) : formatItemForStore(rawItem);
  item['imagesUrl'] = imagesUrl;
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
const getQueryItemsInteractor = async (
  { getItemsByQuery, getStoreByName, getImagesUrlFromS3Buscket },
  { store, query },
  user
) => {
  const validStore = await validateStore(getStoreByName, store);
  const items = await getItemsByQuery({ query, store: validStore.name });

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

  const itemsWithImageUrlPromises = formattedItems.map((item) => {
    return getImagesUrlFromS3Buscket({ images: item.images }).then((urls) => {
      item.imagesUrl = urls;
      return item;
    });
  });
  const itemsWithImageUrl = await Promise.all(itemsWithImageUrlPromises);

  return itemsWithImageUrl;
};

/**
 * Retrieves items from a store based on a given query and formats them.
 * @param {Object} persistence- An object containing functions to retrieve items by query and store name.
 * @param {Function} persistence.getItemsBySearch - A function that retrieves items from a store based on a given text.
 * @param {Function} persistence.getStoreByName - A function that retrieves a store by name.
 * @param {Object} - An object containing the name of the store and the query to retrieve items.
 * @param {string} store - The name of the store to retrieve items from.
 * @param {Object} searchParam - The search param to use to retrieve items.
 * @returns {Array} - An array of formatted items.
 */
const getSearchItemsInteractor = async (
  { getItemsBySearch, getStoreByName, getImagesUrlFromS3Buscket },
  { storeName, searchParam },
  user
) => {
  const validStore = await validateStore(getStoreByName, storeName);
  const items = await getItemsBySearch({ storeName: validStore.name, searchParam });

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

  const itemsWithImageUrlPromises = formattedItems.map((item) => {
    return getImagesUrlFromS3Buscket({ images: item.images }).then((urls) => {
      item.imagesUrl = urls;
      return item;
    });
  });
  const itemsWithImageUrl = await Promise.all(itemsWithImageUrlPromises);

  return itemsWithImageUrl;
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
    return Promise.reject(new Error(`Invalid store`));
  }
  return validStore;
};

const updateItemByIdInteractor = async (
  { updateItemById, getImagesUrlFromS3Buscket },
  { id, storeName, updatedItem }
) => {
  const formattedUpdatedItem = formatItemForUpdate(updatedItem);
  const newItem = await updateItemById({ id, storeName, updatedItem: formattedUpdatedItem });
  if (!newItem) {
    return Promise.reject(new Error('Item not found'));
  }

  // Since we are not displaying the updated image there is on need to make the extra call to S3
  // const imagesUrl = await getImagesUrlFromS3Buscket({ images: newItem.images });
  // if (!imagesUrl) {
  //   return Promise.reject(new Error('Error retrieving Images'));
  // }
  const formattedItem = formatItemForStore(newItem);
  // formattedItem['imagesUrl'] = imagesUrl;

  return formattedItem;
};

// FIX ME: deleting an item should also delete it from the S3 bucket
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
    images: item?.images,
    amount: item?.amount, // amount is here for legacy support, delete it when project is ready for prod
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
    images: item?.images,
    amount: item?.amount,
    discount: item?.discount,
    quantity: item?.quantity,
    displayPrice: item?.price * (1 - item.discount / 100),
  };
};

const formatItemForUpdate = (item) => {
  return {
    title: item?.title,
    price: item?.price,
    discount: item?.discount,
    quantity: item?.quantity,
  };
};

module.exports = {
  createItemInteractor,
  getItemInteractor,
  getSearchItemsInteractor,
  getQueryItemsInteractor,
  updateItemByIdInteractor,
  deleteItemByIdInteractor,
};
