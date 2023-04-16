const createItemInteractor = async (
  { createItem, getStoreByName, saveImagesToS3Bucket },
  { title, price, store, description, discount, category, images, quantity, reviews }
) => {
  const validStore = await validateStore(getStoreByName, store);
  // images.map((item) => {
  //   console.log(item);
  // });

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

  const formattedItem = formatItem(item);
  return formattedItem;
};

const getQueryItemsInteractor = async ({ getItemsByQuery, getStoreByName }, { store, query }) => {
  const validStore = await validateStore(getStoreByName, store);
  const items = await getItemsByQuery({ query, store: validStore });
  const formattedItems = items.map((item) => {
    return formatItem(item);
  });
  return formattedItems;
};

const validateStore = async (getStoreByName, store) => {
  const validStore = await getStoreByName({ storeName: store });
  if (!validStore) {
    throw new Error(`Invalid store`);
  }
  return validStore;
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
