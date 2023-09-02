const getStoreDesignInteractor = async ({ getStoreDesign, getStoreByName }, { storeName }) => {
  const store = await getStoreByName({ storeName });
  if (!store) {
    return Promise.reject(new Error(`Invalid store`));
  }
  const design = await getStoreDesign({ storeName: store.name });
  if (!design) {
    return Promise.reject(new Error(`Design Not Found`));
  }
  return design;
};

const updateStoreDesignInteractor = async ({ updateStoreDesign }, { storeName, update }) => {
  const newDesign = await updateStoreDesign({ storeName, update });
  if (!newDesign) {
    return Promise.reject(new Error('Design not found'));
  }

  return newDesign;
};

module.exports = {
  getStoreDesignInteractor,
  updateStoreDesignInteractor,
};
