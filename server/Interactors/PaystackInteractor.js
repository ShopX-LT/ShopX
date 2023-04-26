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

const verifyPaymentInteractor = async (
  { createOrder, verifyPayment, findOrderByReference, getStoreByName, addOrderToStore, updateItemQuanity },
  { reference }
) => {
  const paymentDetails = await verifyPayment({ reference });
  if (paymentDetails.status !== 'success') {
    throw new Error('Payment failed');
  }
  // Check if it is a duplicate verification
  const duplicate = await findOrderByReference({ reference });
  if (duplicate) {
    throw new Error('Duplicate payment');
  }
  // Create order
  const orderDetails = paymentDetails['metadata']['custom_fields'][0];
  orderDetails['reference'] = paymentDetails['reference'];
  orderDetails['ip_address'] = paymentDetails['ip_address'];
  orderDetails['fees'] = paymentDetails['fees'];
  const order = await createOrder({ details: orderDetails });
  if (!order) {
    // reverse payment
    throw new Error('Failed to create order');
  }

  // Add order to store
  const store = await getStoreByName({ storeName: order.store });
  if (!store) {
    throw new Error('Invalid store');
  }
  await addOrderToStore({ store, order });

  // update the items
  await updateItemQuanity({ order });
};

module.exports = {
  initTransactionInteractor,
  verifyPaymentInteractor,
};
