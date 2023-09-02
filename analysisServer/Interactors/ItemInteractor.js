const getTopSalesInteractor = async ({ getAllItems, getImagesUrlFromS3Buscket }, { storeName }) => {
  let res = [];
  const items = await getAllItems({ storeName });
  // Sort the array by 'sales' property in descending order
  const sortedData = items.sort((a, b) => b.sales - a.sales);
  if (sortedData.length > 3) {
    res = sortedData.slice(0, 3);
  } else res = sortedData;

  const formattedItems = res.map((item) => {
    return formatItemForStore(item);
  });
  const itemsWithImageUrlPromises = formattedItems.map((item) => {
    return getImagesUrlFromS3Buscket({ images: item.images }).then((urls) => {
      // console.log(urls);
      item.imagesUrl = urls;
      return item;
    });
  });

  const itemsWithImageUrl = await Promise.all(itemsWithImageUrlPromises);

  return itemsWithImageUrl;
};

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
    sales: item?.sales,
    salesIpAddresses: item?.salesIpAddresses,
    displayPrice: item?.price * (1 - item.discount / 100),
  };
};

module.exports = {
  getTopSalesInteractor,
};
