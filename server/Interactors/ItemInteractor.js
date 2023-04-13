const createItemInteractor = async (
  { createItem, getStoreByName, saveImagesToS3Bucket },
  { title, price, store, description, discount, category, images, quantity, reviews }
) => {
  const store = await validateStore(store);

  const images = await saveImagesToS3Bucket(images);
  const item = await createItem({ title, price, store, description, discount, category, images, quantity, reviews });

  const formattedItem = formatItem(item);
  return formattedItem;
};

const getQueryItemsInteractor = async ({ getItemsByQuery }, { store, query }) => {
  const store = await validateStore(store);
  const items = await getItemsByQuery({ query });
  const formattedItems = items.map((item) => {
    return formatItem(item);
  });
  return formattedItems;
};

const validateStore = async (store) => {
  const store = await getStoreByName(store);
  if (!store) {
    throw new Error(`Invalid store`);
  }
  return store;
};
const formatItem = (item) => {
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
  getQueryItemsInteractor,
};
