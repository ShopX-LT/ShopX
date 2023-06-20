// const { createItemInteractor } = require('../../Interactors/ItemInteractor'); // Import the necessary functions and dependencies

// const getStoreByName = async ({ storeName }) => {};
// const saveImagesToS3Bucket = async () => {};
// const createItem = async () => {};
// describe('createItemInteractor', () => {
//   // Mock data for testing
//   const inputData = {
//     title: 'Test Item',
//     price: 10.99,
//     store: 'Test Store',
//     description: 'Test description',
//     discount: 0,
//     category: 'Test category',
//     images: ['image1.jpg', 'image2.jpg'],
//     quantity: 5,
//     reviews: [],
//   };

//   const validStore = { name: 'Test Store' };
//   const savedImages = ['image1.jpg', 'image2.jpg'];
//   const createdItem = {
//     /* Mock created item data */
//   };
//   const formattedItem = {
//     /* Mock formatted item data */
//     ...inputData,
//     displayPrice: inputData.price * (1 - inputData.discount / 100),
//   };

//   // Mock the required functions
//   const mockValidateStore = jest.fn().mockResolvedValue(validStore);
//   const mockSaveImagesToS3Bucket = jest.fn().mockResolvedValue(savedImages);
//   const mockCreateItem = jest.fn().mockResolvedValue(createdItem);

//   // Test case: Successful item creation
//   it('should create and return a formatted item', async () => {
//     // Set up the mock dependencies
//     // getStoreByName.mockImplementation(mockValidateStore);
//     // saveImagesToS3Bucket.mockImplementation(mockSaveImagesToS3Bucket);
//     // createItem.mockImplementation(mockCreateItem);

//     // Call the function
//     const result = await createItemInteractor(
//       {
//         createItem: mockCreateItem,
//         getStoreByName: mockValidateStore,
//         saveImagesToS3Bucket: mockSaveImagesToS3Bucket,
//       },
//       inputData
//     );

//     // Assertions
//     expect(result).toEqual(formattedItem);
//     expect(getStoreByName).toHaveBeenCalledWith(inputData.store);
//     expect(mockValidateStore).toHaveBeenCalledWith(getStoreByName, inputData.store);
//     expect(saveImagesToS3Bucket).toHaveBeenCalledWith(inputData.images);
//     expect(mockCreateItem).toHaveBeenCalledWith({
//       title: inputData.title,
//       price: inputData.price,
//       store: validStore.name,
//       description: inputData.description,
//       discount: inputData.discount,
//       category: inputData.category,
//       images: savedImages,
//       quantity: inputData.quantity,
//       reviews: inputData.reviews,
//     });
//   });

//   // Test case: Error saving images
//   it('should return null when there is an error saving images', async () => {
//     // Set up the mock dependencies
//     getStoreByName.mockImplementation(mockValidateStore);
//     saveImagesToS3Bucket.mockResolvedValue(null);

//     // Call the function
//     const result = await createItemInteractor(
//       {
//         createItem: createItem,
//         getStoreByName: getStoreByName,
//         saveImagesToS3Bucket: saveImagesToS3Bucket,
//       },
//       inputData
//     );

//     // Assertion
//     expect(result).toBeNull();
//   });

//   // Add more test cases as needed for different scenarios and error conditions
// });
