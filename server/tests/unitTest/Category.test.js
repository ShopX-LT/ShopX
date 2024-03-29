const { createCategoryInteractor, getAllCategoriesInteractor } = require('../../Interactors/CategoryInteractor');
const { getStoreByNameAndEmail, addCategoryToStore, createCategory } = require('../mockData/MockCategoryPersistence');

let goodInput = { storeName: 'valid store', email: 'admin@test.com', category: 'category new' };

const store = {
  name: 'valid store',
  categories: [],
};

describe('createCategoryInteractor', () => {
  beforeEach(() => {
    store.categories = [];
  });
  test('should successfully create a category', async () => {
    const newCategory = await createCategoryInteractor(
      {
        addCategoryToStore,
        getStoreByNameAndEmail,
        createCategory,
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
          addCategoryToStore,
          getStoreByNameAndEmail,
          createCategory,
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
          addCategoryToStore,
          getStoreByNameAndEmail,
          createCategory,
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
          addCategoryToStore,
          getStoreByNameAndEmail,
          createCategory,
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
      { getStoreByName: getStoreByNameAndEmail, getManyCategories },
      { storeName }
    );

    expect(result).toEqual(expectedFormattedCategories);
    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName });
    expect(getManyCategories).toHaveBeenCalledWith({ categories: validCategories });
  });

  test('should throw an error when store is invalid', async () => {
    getStoreByNameAndEmail.mockResolvedValue(null);

    await expect(
      getAllCategoriesInteractor({ getStoreByName: getStoreByNameAndEmail, getManyCategories }, { storeName })
    ).rejects.toThrow('Invalid store');

    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName });
    expect(getManyCategories).not.toHaveBeenCalled();
  });

  test('should throw an error when categories retrieval fails', async () => {
    const store = { categories: invalidCategories };

    getStoreByNameAndEmail.mockResolvedValue(store);
    getManyCategories.mockResolvedValue(invalidCategories);

    await expect(
      getAllCategoriesInteractor({ getStoreByName: getStoreByNameAndEmail, getManyCategories }, { storeName })
    ).rejects.toThrow('Error retrieving categories');

    expect(getStoreByNameAndEmail).toHaveBeenCalledWith({ storeName });
    expect(getManyCategories).toHaveBeenCalledWith({ categories: null });
  });

  test('should return null when an error occurs', async () => {
    const errorMessage = 'Something went wrong';
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    getStoreByNameAndEmail.mockRejectedValue(new Error(errorMessage));

    const result = await getAllCategoriesInteractor(
      { getStoreByName: getStoreByNameAndEmail, getManyCategories },
      { storeName }
    );

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Category Interact error in getAllCategoriesInteractor()',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
