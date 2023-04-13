const formatCategory = (category) => {
  return { id: category.id, name: category.name };
};

const createCategoryInteractor = async (
  { addCategoryToStore, getStoreByNameAndEmail, createCategory },
  { storeName, email, category }
) => {
  // find the store
  const store = await getStoreByNameAndEmail({ storeName, email });
  if (!store) {
    throw new Error('Invalid store');
  }

  //   create the category
  const category = await createCategory({
    name: category,
    storeName: store.name,
    creatorsEmail: email,
  });

  //   add the category to the store
  await addCategoryToStore({ store, categoryId: category._id });

  const formattedCategories = store['categories'].map((category) => {
    return formatCategory(category);
  });

  return formattedCategories;
};

const getAllCategoriesInteractor = async ({ getStoreByNameAndEmail }, { storeName, email }) => {
  // find the store
  const store = await getStoreByNameAndEmail({ storeName, email });
  if (!store) {
    throw new Error('Invalid store');
  }
  //   only send relevant fields
  const formattedCategories = store['categories'].map((category) => {
    return formatCategory(category);
  });
  return formattedCategories;
};

module.exports = {
  createCategoryInteractor,
  getAllCategoriesInteractor,
};
