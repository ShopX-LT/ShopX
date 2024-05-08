const { createItemInteractor, getItemInteractor } = require('../../Interactors/ItemInteractor');
// Import other dependencies and mock functions here if needed

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

// Mock functions
const createItemMock = jest.fn();
const getStoreByNameMock = jest.fn();
const saveImagesToS3BucketMock = jest.fn();
const addFieldValueToStoreMock = jest.fn();
const getItemByIdMock = jest.fn();
const getImagesUrlFromS3BuscketMock = jest.fn();

// Sample item data for testing
const itemData = {
  title: 'Sample Item',
  price: 20,
  store: 'Example Store',
  images: ['image1.jpg', 'image2.jpg'],
  // ... other properties
};

describe('createItemInteractor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates and formats an item correctly', async () => {
    const validStore = {
      name: 'example store',
      itemTemplate: ['category', 'color'], // Sample fields
      itemTemplateValue: { category: [], color: [] }, // Sample field values
      // ... other properties
    };
    const createdItem = {
      _id: 'item_id',
      // ... other properties
    };
    const expectedFormattedItem = formatItemForStore(createdItem);

    // Mock function implementations
    getStoreByNameMock.mockResolvedValue(validStore);
    addFieldValueToStoreMock.mockResolvedValue(true);
    saveImagesToS3BucketMock.mockResolvedValue(itemData.images);
    createItemMock.mockResolvedValue(createdItem);

    const result = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemData
    );

    expect(result).toEqual(expectedFormattedItem);
    expect(getStoreByNameMock).toHaveBeenCalledWith({ storeName: itemData.store });
    expect(addFieldValueToStoreMock).toHaveBeenCalledWith(
      expect.objectContaining({
        store: validStore,
      })
    );
    expect(saveImagesToS3BucketMock).toHaveBeenCalledWith(itemData.images);
    expect(createItemMock).toHaveBeenCalledWith({
      ...itemData,
      store: validStore.name,
      images: itemData.images,
    });
  });

  it('handles errors gracefully', async () => {
    // Mock function implementations to simulate errors
    getStoreByNameMock.mockRejectedValue(new Error('Store not found'));

    const result = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemData
    );

    expect(result).toBeNull();
    expect(getStoreByNameMock).toHaveBeenCalledWith({ storeName: itemData.store });
    // Check other function calls and error handling as needed
  });

  it('handles image not saved errors', async () => {
    saveImagesToS3BucketMock.mockRejectedValue(new Error('Error saving images'));
    const result = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemData
    );

    expect(getStoreByNameMock).toHaveBeenCalledWith({ storeName: itemData.store });
    expect(createItemMock).not.toHaveBeenCalledWith();
    expect(result).toBeNull();
  });

  it('handles creating fields errors', async () => {
    addFieldValueToStoreMock.mockRejectedValue(new Error('Error saving images'));
    const result = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemData
    );

    expect(getStoreByNameMock).toHaveBeenCalledWith({ storeName: itemData.store });
    expect(createItemMock).not.toHaveBeenCalledWith();
    expect(result).toBeNull();
  });

  it('handles field values correctly', async () => {
    const validStore = {
      name: 'Example Store',
      itemTemplate: ['category', 'color'], // Sample fields
      itemTemplateValue: { category: ['electronics'], color: ['red'] }, // Sample existing field values
      // ... other properties
    };

    // Mock function implementations
    getStoreByNameMock.mockResolvedValue(validStore);
    addFieldValueToStoreMock.mockResolvedValue(true);
    saveImagesToS3BucketMock.mockResolvedValue(itemData.images);
    createItemMock.mockResolvedValue({
      /* ... */
    });

    await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemData
    );

    expect(addFieldValueToStoreMock).toHaveBeenCalledWith(
      expect.objectContaining({
        store: expect.objectContaining({
          itemTemplateValue: expect.objectContaining({
            category: expect.arrayContaining(['electronics']),
            color: expect.arrayContaining(['red']),
          }),
        }),
      })
    );
  });
});

// ==============================
describe('handleFieldValues', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds a new field value to a store's field", async () => {
    const itemDataWithFields = {
      title: 'Sample Item',
      price: 20,
      category: 'mens',
      color: 'red',
      images: ['image1.jpg', 'image2.jpg'],
    };
    const store = {
      name: 'sample',
      itemTemplate: ['category', 'color'],
      itemTemplateValue: { category: [], color: [] },
    };

    createItemMock.mockResolvedValue(itemDataWithFields); // can be anthing here, just need to handleFieldValues
    getStoreByNameMock.mockResolvedValue(store);
    addFieldValueToStoreMock.mockResolvedValue(true);
    saveImagesToS3BucketMock.mockResolvedValue(itemDataWithFields.images);

    const newItem = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemDataWithFields
    );

    expect(store.itemTemplateValue.category[0]).toEqual(itemDataWithFields.category);
    expect(store.itemTemplateValue.color[0]).toEqual(itemDataWithFields.color);
    expect(store.itemTemplateValue.category.length).toEqual(1);
    expect(store.itemTemplateValue.color.length).toEqual(1);
    expect(createItemMock).toHaveBeenCalled();
  });

  it("should not add an existing field value to a store's field", async () => {
    const itemDataWithFields = {
      title: 'Sample Item',
      price: 20,
      category: 'mens',
      color: 'red',
      images: ['image1.jpg', 'image2.jpg'],
    };
    const store = {
      name: 'sample',
      itemTemplate: ['category', 'color'],
      itemTemplateValue: { category: ['mens'], color: ['red'] },
    };

    createItemMock.mockResolvedValue(itemDataWithFields);
    getStoreByNameMock.mockResolvedValue(store);
    addFieldValueToStoreMock.mockResolvedValue(true);
    saveImagesToS3BucketMock.mockResolvedValue(itemDataWithFields.images);

    const newItem = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemDataWithFields
    );

    expect(store.itemTemplateValue.category[0]).toEqual(itemDataWithFields.category);
    expect(store.itemTemplateValue.color[0]).toEqual(itemDataWithFields.color);
    expect(store.itemTemplateValue.category.length).toEqual(1);
    expect(store.itemTemplateValue.color.length).toEqual(1);
    expect(createItemMock).toHaveBeenCalled();
  });

  it("should not add null as a field value to a store's field", async () => {
    const itemDataWithFields = {
      title: 'Sample Item',
      price: 20,
      category: 'mens',
      color: null,
      images: ['image1.jpg', 'image2.jpg'],
    };
    const store = {
      name: 'sample',
      itemTemplate: ['category', 'color'],
      itemTemplateValue: { category: [], color: [] },
    };

    createItemMock.mockResolvedValue(itemDataWithFields);
    getStoreByNameMock.mockResolvedValue(store);
    addFieldValueToStoreMock.mockResolvedValue(true);
    saveImagesToS3BucketMock.mockResolvedValue(itemDataWithFields.images);

    const newItem = await createItemInteractor(
      {
        createItem: createItemMock,
        getStoreByName: getStoreByNameMock,
        saveImagesToS3Bucket: saveImagesToS3BucketMock,
        addFieldValueToStore: addFieldValueToStoreMock,
      },
      itemDataWithFields
    );

    expect(store.itemTemplateValue.color.length).toEqual(0);
    expect(store.itemTemplateValue.category[0]).toEqual(itemDataWithFields.category);
    expect(store.itemTemplateValue.category.length).toEqual(1);
    expect(createItemMock).toHaveBeenCalled();
  });
});

// =======================
describe('getItemInteractor tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get an item for a user', async () => {
    const customItemData = {
      title: 'Sample Item',
      price: 20,
      store: 'Example Store',
      images: ['image1.jpg', 'image2.jpg'],
      // ... other properties
    };
    getItemByIdMock.mockResolvedValue(customItemData);
    getImagesUrlFromS3BuscketMock.mockResolvedValue(customItemData.images);

    const responseItem = await getItemInteractor(
      { getItemById: getItemByIdMock, getImagesUrlFromS3Buscket: getImagesUrlFromS3BuscketMock },
      { id: 'anything' },
      true
    );

    expect(responseItem).toHaveProperty('imagesUrl');
    expect(responseItem?.imagesUrl).toHaveLength(2);
  });

  it('should return Item not found error', async () => {
    getItemByIdMock.mockResolvedValue(null);
    getImagesUrlFromS3BuscketMock.mockResolvedValue([]);

    await expect(
      getItemInteractor(
        { getItemById: getItemByIdMock, getImagesUrlFromS3Buscket: getImagesUrlFromS3BuscketMock },
        { id: 'anything' },
        true
      )
    ).rejects.toThrow('Item not found');
  });

  it('should return Error retrieving Images', async () => {
    getItemByIdMock.mockResolvedValue(itemData);
    getImagesUrlFromS3BuscketMock.mockResolvedValue(null);

    await expect(
      getItemInteractor(
        { getItemById: getItemByIdMock, getImagesUrlFromS3Buscket: getImagesUrlFromS3BuscketMock },
        { id: 'anything' },
        true
      )
    ).rejects.toThrow('Error retrieving Images');
  });
  /**
   * 1. It should return an item - for user(done) and store
   */
});
