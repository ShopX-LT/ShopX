const index = require('../../index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Item = require('../../models/Item');
const { initTransactionInteractor } = require('../../Interactors/index');
const persistence = require('../../persistence/index');

let server;
let testStoreItems;
const userDetails = {
  email: 'testeamil@test.com',
  address1: '123 test street',
  city: 'test',
  state: 'Jest',
  country: 'JavaScript',
};
const testStore = 'kg-watches';
const homepageUrl = 'https://myshopx.net';

async function setup() {
  const app = index.makeApp(mongoose, process.env.MONGO_URL);
  const PORT = 8000;
  server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  testStoreItems = await Item.find().exec();
}

async function cleanup() {
  await mongoose.connection.close();
  await server.close();
}
describe('Paystack Integration Tests', () => {
  beforeAll(async () => {
    await setup();
  });
  afterAll(async () => {
    await cleanup();
  });

  it('should redirect to the homepage when user details are wrong', async () => {
    const badUserDetails = { email: '', address1: '', city: '', state: '', country: '' };
    const cart = [{ itemId: '', title: '', price: '', quantity: '', availableQuantity: '', store: testStore }];
    const response = await initTransactionInteractor(persistence, {
      userDetails: badUserDetails,
      items: cart,
      storeName: testStore,
    });

    expect(response).toEqual(homepageUrl);
  });
  it('should throw an error when user details fields are wrong', async () => {
    const badUserDetails = { wrongField: '' };
    const cart = [{ itemId: '', title: '', price: '', quantity: '', availableQuantity: '', store: testStore }];
    const response = await initTransactionInteractor(persistence, {
      userDetails: badUserDetails,
      items: cart,
      storeName: testStore,
    });

    expect(response).toEqual(homepageUrl);
  });
  it('should redirect to the homepage if the cart is empty', async () => {
    const response = await initTransactionInteractor(persistence, {
      userDetails: userDetails,
      items: [],
      storeName: testStore,
    });

    expect(response).toEqual(homepageUrl);
  });
  it('should redirect to the homepage if the cart has no item from the selected store', async () => {
    const cart = [{ itemId: '', title: '', price: '', quantity: '', availableQuantity: '', store: 'randomStore' }];
    const response = await initTransactionInteractor(persistence, {
      userDetails: userDetails,
      items: cart,
      storeName: testStore,
    });

    expect(response).toEqual(homepageUrl);
  });
  it('should throw an error if a cart item id is invalid', async () => {
    const cart = [{ itemId: 'invalid', title: '', price: '', quantity: '', availableQuantity: '', store: testStore }];
    await expect(
      initTransactionInteractor(persistence, {
        userDetails: userDetails,
        items: cart,
        storeName: testStore,
      })
    ).rejects.toThrow('Invalid cart item');
  });
  it('should return a transaction url', async () => {
    const cart = [
      {
        itemId: testStoreItems[0]._id,
        title: testStoreItems[0].title,
        price: testStoreItems[0].price,
        quantity: testStoreItems[0].quantity - testStoreItems[0].quantity + 1,
        availableQuantity: testStoreItems[0].quantity,
        store: testStore,
      },
    ];
    const response = await initTransactionInteractor(persistence, {
      userDetails: userDetails,
      items: cart,
      storeName: testStore,
    });
    expect(typeof response).toBe('string');
    expect(response).not.toBe(homepageUrl);
  });
});
