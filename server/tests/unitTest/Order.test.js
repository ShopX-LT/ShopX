const { getStoreOrdersInteractor } = require('../../Interactors/OrderInteractor');
// Import other dependencies and mock functions here if needed

// Mock the getAllStoreOrders function
const getAllStoreOrdersMock = jest.fn();

// Sample formatOrder function for testing
const formatOrder = jest.fn((order) => ({
  id: order?._id,
  orderedBy: order?.orderedBy,
  itemsOrdered: order?.itemsOrdered,
  store: order?.store,
  status: order?.status,
  total: order?.total,
  subTotal: order?.subTotal,
  dateOrdered: order?.dateOrdered,
  dateDelivered: order?.dateDelivered,
  deliveryFee: order?.deliveryFee,
  deliveryAddress: order?.deliveryAddress,
  billingAddress: order?.billingAddress,
  fees: order?.fees,
  notes: order?.notes,
}));

describe('getStoreOrdersInteractor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and formats orders correctly', async () => {
    const storeName = 'exampleStore';
    const rawOrders = [
      { _id: '1', orderedBy: 'User A' /* ... other properties */ },
      { _id: '2', orderedBy: 'User B' /* ... other properties */ },
    ];
    const expectedFormattedOrders = rawOrders.map(formatOrder);

    getAllStoreOrdersMock.mockResolvedValue(rawOrders);

    const result = await getStoreOrdersInteractor({ getAllStoreOrders: getAllStoreOrdersMock }, { storeName });

    expect(result).toEqual(expectedFormattedOrders);
    expect(getAllStoreOrdersMock).toHaveBeenCalledWith({ storeName });
    expect(formatOrder).toHaveBeenCalledTimes(2); // Assuming there are two orders
  });

  it('handles no orders gracefully', async () => {
    const storeName = 'exampleStore';

    getAllStoreOrdersMock.mockResolvedValue([]);

    const result = await getStoreOrdersInteractor({ getAllStoreOrders: getAllStoreOrdersMock }, { storeName });

    expect(result).toEqual([]);
    expect(getAllStoreOrdersMock).toHaveBeenCalledWith({ storeName });
    expect(formatOrder).not.toHaveBeenCalled();
  });
});

/*
 * TEST CASES:
 * 1. Creates an order
 * 2. Retrivies orders for a store
 * 3. Updates an order
 * 4. Update an order that does not exist
 * 5. Get orders from a store that does not exist
 */
