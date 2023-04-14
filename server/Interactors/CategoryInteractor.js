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
  const newCategory = await createCategory({
    name: category,
    storeName: store.name,
    creatorsEmail: email,
  });

  //   add the category to the store
  await addCategoryToStore({ store, categoryId: newCategory._id });

  const formattedCategories = store['categories'].map((category) => {
    return formatCategory(category);
  });

  return formattedCategories;
};

const getAllCategoriesInteractor = async ({ getStoreByNameAndEmail, getManyCategories }, { storeName, email }) => {
  // find the store
  const store = await getStoreByNameAndEmail({ storeName, email });
  if (!store) {
    throw new Error('Invalid store');
  }
  const categories = await getManyCategories({ categories: store['categories'] });
  //   only send relevant fields
  const formattedCategories = categories.map((category) => {
    return formatCategory(category);
  });

  return formattedCategories;
};

module.exports = {
  createCategoryInteractor,
  getAllCategoriesInteractor,
};
