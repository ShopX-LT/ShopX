const store = {
  name: 'valid store',
  categories: [],
};
const storeWithBadCategory = {
  name: 'store with bad category',
  categories: 'should be an array',
};

const getStoreByNameAndEmail = async ({ storeName, email }) => {
  if (storeName === 'valid store') return store;
  if (storeName === 'store with bad category') return storeWithBadCategory;
  return null;
};

const addCategoryToStore = async ({ store, categoryId }) => {
  try {
    store.categories.push(categoryId);
    return true;
  } catch (error) {
    return null;
  }
};

const createCategory = async ({ name, storeName, creatorsEmail }) => {
  if (!name || !storeName || !creatorsEmail) return null;
  return { id: 'goodid', name: name, storeName: storeName, creatorsEmail: creatorsEmail };
};

module.exports = { getStoreByNameAndEmail, addCategoryToStore, createCategory };
