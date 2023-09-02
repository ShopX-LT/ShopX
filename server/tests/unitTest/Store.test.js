const { createStoreInteractor } = require('../../Interactors/StoreInteractor');

// Mock the persistence functions
const persistence = {
  getStoreByName: jest.fn(),
  createStore: jest.fn(),
  createWebDesign: jest.fn(),
  generateText: jest.fn(),
};

// Define the test case
describe('createStoreInteractor', () => {
  afterEach(() => {
    // Reset the mock implementation and clear the mock calls
    jest.clearAllMocks();
  });

  it('should create a new store and return the formatted store object', async () => {
    // Mock the getStoreByName function to return null (indicating that the store doesn't exist)
    persistence.getStoreByName.mockResolvedValueOnce(null);

    // Mock the createStore function to return the newly created store object
    const newStore = { id: 1, name: 'Example Store', email: 'example@store.com' };
    persistence.createStore.mockResolvedValueOnce(newStore);
    persistence.createWebDesign.mockResolvedValueOnce('design');
    persistence.generateText.mockResolvedValueOnce({ mainText: 'design', subTest: 'sub' });

    // Call the function with the appropriate arguments
    const storeName = 'Example Store';
    const email = 'example@store.com';
    const result = await createStoreInteractor(persistence, {
      storeName,
      email,
      product: 'watches',
      brandColor: '#555555',
    });

    // Verify the mock calls
    expect(persistence.getStoreByName).toHaveBeenCalledWith({ storeName });
    expect(persistence.createStore).toHaveBeenCalledWith({ storeName, email });

    // Verify the returned value
    expect(result.store).toHaveProperty('name', 'Example Store');
  });

  it('should throw an error if the store already exists', async () => {
    // Mock the getStoreByName function to return an existing store object
    const existingStore = { id: 1, storeName: 'Existing Store', email: 'existing@store.com' };
    persistence.getStoreByName.mockResolvedValueOnce(existingStore);

    // Call the function with the appropriate arguments
    const storeName = 'Existing Store';
    const email = 'existing@store.com';
    await expect(createStoreInteractor(persistence, { storeName, email })).rejects.toThrow('Store already exists');

    // Verify the mock calls
    expect(persistence.getStoreByName).toHaveBeenCalledWith({ storeName });
    expect(persistence.createStore).not.toHaveBeenCalled();
  });
});
