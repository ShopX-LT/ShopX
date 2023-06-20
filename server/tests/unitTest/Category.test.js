const { createCategoryInteractor, getAllCategoriesInteractor } = require('../../Interactors/CategoryInteractor');

let goodInput = { storeName: 'valid store', email: 'admin@test.com', category: 'category new' };

const store = {
  name: 'valid store',
  categories: [],
};
const storeWithBadCategory = {
  name: 'store with bad category',
  categories: 'should be an array',
};
//   MOCK PERSISTENCE
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

describe('createCategoryInteractor', () => {
  beforeEach(() => {
    store.categories = [];
  });
  test('should successfully create a category', async () => {
    const newCategory = await createCategoryInteractor(
      {
        addCategoryToStore: addCategoryToStore,
        getStoreByNameAndEmail: getStoreByNameAndEmail,
        createCategory: createCategory,
      },
      goodInput
    );
    expect(newCategory.id).toEqual('goodid');
    expect(newCategory.name).toEqual(goodInput.category);
    expect(newCategory.storeName).toEqual(store.name);
    expect(newCategory.creatorsEmail).toEqual(goodInput.email);
    expect(store.categories[0]).toEqual(goodInput.id);
  });

  test('should throw an invalid store error', async () => {
    // should throw an invalid store error
    const badInput = { storeName: 'not a valid store', email: 'admin@test.com', category: 'category new' };

    await expect(async () => {
      await createCategoryInteractor(
        {
          addCategoryToStore: addCategoryToStore,
          getStoreByNameAndEmail: getStoreByNameAndEmail,
          createCategory: createCategory,
        },
        badInput
      );
    }).rejects.toThrow('Invalid store');
  });
  test('should throw error creating new category', async () => {
    // should throw a save category error
    const badInput = { storeName: 'valid store', email: 'admin@test.com' };

    await expect(async () => {
      await createCategoryInteractor(
        {
          addCategoryToStore: addCategoryToStore,
          getStoreByNameAndEmail: getStoreByNameAndEmail,
          createCategory: createCategory,
        },
        badInput
      );
    }).rejects.toThrow('Error creating new category');
  });
  test('should throw error saving new category', async () => {
    // should throw a save category error
    const badInput = { storeName: 'store with bad category', email: 'admin@test.com', category: 'category new' };

    await expect(async () => {
      await createCategoryInteractor(
        {
          addCategoryToStore: addCategoryToStore,
          getStoreByNameAndEmail: getStoreByNameAndEmail,
          createCategory: createCategory,
        },
        badInput
      );
    }).rejects.toThrow('Error saving new category');
  });
});

describe('getAllCategoriesInteractor', () => {
  const storeName = 'Test Store';
  const email = 'admin@test.com';
  const validCategories = [
    { id: 'Category 1', name: 'Category 1', store: 'Test Store', creatorsEmail: 'admin@test.com' },
    { id: 'Category 2', name: 'Category 2', store: 'Test Store', creatorsEmail: 'admin@test.com' },
  ];
  const invalidCategories = null;

  const getStoreByNameAndEmail = jest.fn();
  const getManyCategories = jest.fn();

  beforeEach(() => {
    getStoreByNameAndEmail.mockReset();
    getManyCategories.mockReset();
  });

  test('should return formatted categories when store and categories are valid', async () => {
    const store = { categories: validCategories };
    const expectedFormattedCategories = [
      { id: 'Category 1', name: 'Category 1', store: 'Test Store', creatorsEmail: 'admin@test.com' },
      { id: 'Category 2', name: 'Category 2', store: 'Test Store', creatorsEmail: 'admin@test.com' },
    ];

    getStoreByNameAndEmail.mockResolvedValue(store);
    getManyCategories.mockResolvedValue(validCategories);

    const result = await getAllCategoriesInteractor(
      { getStoreByNameAndEmail, getManyCategories },
      { storeName, email }
    );

    expect(result).toEqual(expectedFormattedCategories);
    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName, email });
    expect(getManyCategories).toHaveBeenCalledWith({ categories: validCategories });
  });

  test('should throw an error when store is invalid', async () => {
    getStoreByNameAndEmail.mockResolvedValue(null);

    await expect(
      getAllCategoriesInteractor({ getStoreByNameAndEmail, getManyCategories }, { storeName, email })
    ).rejects.toThrow('Invalid store');

    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName, email });
    expect(getManyCategories).not.toHaveBeenCalled();
  });

  test('should throw an error when categories retrieval fails', async () => {
    const store = { categories: validCategories };

    getStoreByNameAndEmail.mockResolvedValue(store);
    getManyCategories.mockResolvedValue(invalidCategories);

    await expect(
      getAllCategoriesInteractor({ getStoreByNameAndEmail, getManyCategories }, { storeName, email })
    ).rejects.toThrow('Error retrieving categories');

    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName, email });
    expect(getManyCategories).toHaveBeenCalledWith({ categories: validCategories });
  });

  test('should return null when an error occurs', async () => {
    const errorMessage = 'Something went wrong';
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    getStoreByNameAndEmail.mockRejectedValue(new Error(errorMessage));

    const result = await getAllCategoriesInteractor(
      { getStoreByNameAndEmail, getManyCategories },
      { storeName, email }
    );

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Category Interact error in getAllCategoriesInteractor()',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
