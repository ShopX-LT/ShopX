const { createItemInteractor } = require('../../Interactors/ItemInteractor');
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
      name: 'Example Store',
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

  // Add more test cases here for edge and normal cases
});
