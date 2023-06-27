// Import the necessary modules and dependencies
const { createStoreInteractor } = require('../../Interactors/StoreInteractor'); // Replace `yourModule` with the actual module name

// Mock the persistence functions
const persistence = {
  getStore: jest.fn(),
  createStore: jest.fn(),
};

// Define the test case
describe('createStoreInteractor', () => {
  afterEach(() => {
    // Reset the mock implementation and clear the mock calls
    jest.clearAllMocks();
  });

  it('should create a new store and return the formatted store object', async () => {
    // Mock the getStore function to return null (indicating that the store doesn't exist)
    persistence.getStore.mockResolvedValueOnce(null);

    // Mock the createStore function to return the newly created store object
    const newStore = { id: 1, storeName: 'Example Store', email: 'example@store.com' };
    persistence.createStore.mockResolvedValueOnce(newStore);

    // Call the function with the appropriate arguments
    const storeName = 'Example Store';
    const email = 'example@store.com';
    const result = await createStoreInteractor(persistence, { storeName, email });

    // Verify the mock calls
    expect(persistence.getStore).toHaveBeenCalledWith({ storeName });
    expect(persistence.createStore).toHaveBeenCalledWith({ storeName, email });

    // Verify the returned value
    expect(result).toEqual({ formattedStore: { id: 1, storeName: 'Example Store', email: 'example@store.com' } });
  });

  it('should throw an error if the store already exists', async () => {
    // Mock the getStore function to return an existing store object
    const existingStore = { id: 1, storeName: 'Existing Store', email: 'existing@store.com' };
    persistence.getStore.mockResolvedValueOnce(existingStore);

    // Call the function with the appropriate arguments
    const storeName = 'Existing Store';
    const email = 'existing@store.com';
    await expect(createStoreInteractor(persistence, { storeName, email })).rejects.toThrow('Store already exists');

    // Verify the mock calls
    expect(persistence.getStore).toHaveBeenCalledWith({ storeName });
    expect(persistence.createStore).not.toHaveBeenCalled();
  });
});
