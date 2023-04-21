/**
 * Retrieves all orders for a given store and formats them using the formatOrder function.
 * @param {Object} getAllStoreOrders - The function that retrieves all orders for a given store.
 * @param {string} storeName - The name of the store to retrieve orders for.
 * @returns {Array} An array of formatted orders.
 */
const getStoreOrdersInteractor = async ({ getAllStoreOrders }, { storeName }) => {
  const rawOrders = await getAllStoreOrders({ storeName });
  const orders = rawOrders.map((order) => {
    return formatOrder(order);
  });
  return orders;
};

const formatOrder = (order) => {
  return {
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
  };
};

module.exports = {
  getStoreOrdersInteractor,
};
