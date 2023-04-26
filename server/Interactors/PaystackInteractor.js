const getSubTotal = (items) => {
  let subTotal = 0; //sub total in kobo
  items.forEach((item) => {
    const price = item.price * (1 - item.discount / 100) * 100;
    subTotal += item.purchasedQuantity * price;
  });
  return subTotal;
};

const massageItems = (items) => {
  const orderItems = items.map((item) => {
    ({
      itemId: item._id,
      title: item.title,
      discount: item.discount,
      price: item.price,
      paid: item.price * (1 - item.discount / 100),
      quantity: item.purchasedQuantity,
    });
  });
  return orderItems;
};

const buildPayload = ({ userDetails, items, subTotal, deliveryFee, storeName }) => {
  const { email, address1, address2, city, state, country, notes } = userDetails;
  const body = {
    email: email,
    amount: subTotal + deliveryFee,
    callback_url: 'http://localhost:3000/payment-success',
    metadata: {
      custom_fields: [
        {
          orderedBy: email,
          items: items,
          subTotal: subTotal / 100,
          total: total / 100,
          isDelivered: false,
          dateOrdered: Date.now(),
          cancelled: false,
          deliveryAddress: { address1, address2, city, state, country },
          notes: notes,
          store: storeName,
        },
      ],
    },
  };

  return body;
};

const initTransactionInteractor = async (
  { initiateTransaction, getGroupedItems, getStoreByName },
  { items, userDetails }
) => {
  // get the items based of the ids and massage them
  const dereferencedItems = await getGroupedItems(items);
  const massagedItems = massageItems(dereferencedItems);
  // get the subtotal
  const subTotal = getSubTotal(dereferencedItems);

  //   get the store
  const store = await getStoreByName({ storeName: dereferencedItems[0].store });
  if (!store) {
    throw new Error('Invalid store');
  }

  const body = buildPayload({
    userDetails: userDetails,
    items: massagedItems,
    subTotal: subTotal,
    deliveryFee: store.deliveryFee,
    storeName: store.name,
  });

  const url = await initiateTransaction({ body });
  //   add checks for if not url
  return url;
};

const verifyPaymentInteractor = async ({ createOrderInteractor, verifyPayment }, { reference }) => {};

module.exports = {
  initTransactionInteractor,
};
