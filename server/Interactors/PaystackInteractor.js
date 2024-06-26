const { v4: uuidv4 } = require('uuid');
const { sendNewOrderEmail } = require('../services/EmailService');

const priceAfterDiscount = (price, discount) => {
  return price * (1 - discount / 100);
};

const priceInKobo = (price) => {
  return price * 100;
};
const koboToNaira = (price) => {
  return price / 100;
};

const getSubTotal = (items) => {
  let subTotal = 0; //sub total in kobo
  items.forEach((item) => {
    const priceInKb = priceInKobo(priceAfterDiscount(item.price, item.discount));
    subTotal += item.purchasedQuantity * priceInKb;
  });
  return subTotal;
};

const massageItems = (items, stripeItem = false) => {
  const orderItems = items.map((item) => {
    if (stripeItem) {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            // images: item.images,
            metadata: {
              itemId: item._id,
              title: item.title,
              discount: item.discount,
              price: item.price,
              paid: priceAfterDiscount(item.price, item.discount),
              quantity: item.purchasedQuantity,
            },
          },
          unit_amount: priceAfterDiscount(item.price, item.discount) * 100,
        },
        quantity: item.purchasedQuantity,
      };
    } else {
      return {
        itemId: item._id,
        title: item.title,
        discount: item.discount,
        price: item.price,
        paid: priceAfterDiscount(item.price, item.discount),
        quantity: item.purchasedQuantity,
      };
    }
  });
  return orderItems;
};

const buildPayload = ({ userDetails, items, subTotal, deliveryFee, storeName }) => {
  const { email, address1, address2, city, state, country, notes } = userDetails;
  const serviceFee = 1.1;
  // const total = (subTotal + deliveryFee * 100) * serviceFee;
  const total = Math.round(subTotal * serviceFee);
  const body = {
    email: email,
    amount: total,
    ref: uuidv4(),
    callback_url: `https://${storeName}.myshopx.net/payment-success`,
    // callback_url: `http://${storeName}.localhost:4000/payment-success`,
    metadata: {
      custom_fields: [
        {
          orderedBy: email,
          itemsOrdered: items,
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

const verifyUserDetails = (userDetails) => {
  if (!userDetails.email || !userDetails.address1 || !userDetails.city || !userDetails.state || !userDetails.country) {
    return false;
  }
  return true;
};

// @ TO-DO: Change function to accept storeName instead of using derefenced Items
// @ TO-DO: Add delivery fee when ready
/**
 *
 * @param {Array} items - { itemId, title, price, quantity, availableQuantity, store }
 * @param {Object} userDetails
 * @returns
 */
const initTransactionInteractor = async (
  { initiateTransaction, getGroupedItems, getStoreByName },
  { items, userDetails, storeName }
) => {
  if (items.length <= 0 || !verifyUserDetails(userDetails)) {
    return 'https://www.myshopx.net';
  }
  const cartItemsFromCurrentStore = items.filter((item) => {
    return item.store === storeName;
  });
  if (cartItemsFromCurrentStore.length <= 0) {
    return 'https://www.myshopx.net';
  }
  // get the items based of the ids and massage them
  const dereferencedItems = await getGroupedItems(cartItemsFromCurrentStore);
  if (dereferencedItems === null) {
    return Promise.reject(new Error('Invalid cart item'));
  }
  const massagedItems = massageItems(dereferencedItems);

  // get the subtotal
  const subTotal = getSubTotal(dereferencedItems);

  //   get the store
  const store = await getStoreByName({ storeName: dereferencedItems[0]?.store });
  if (!store) {
    return Promise.reject(new Error('Invalid store'));
  }

  // Create transaction with massagedItems and user details and subtotal and storename
  // give transction a transaction Id

  const body = buildPayload({
    userDetails: userDetails,
    items: massagedItems,
    subTotal: subTotal,
    // deliveryFee: 1500,
    storeName: store.name,
  });

  const url = await initiateTransaction({ body });
  //   add checks for if not url
  return url;
};

const verifyPaymentInteractor = async (
  { createOrder, verifyPayment, findOrderByReference, getStoreByName, addOrderToStore, updateItemStatistics },
  { reference }
) => {
  console.log(reference);
  const paymentDetails = await verifyPayment({ reference });
  if (paymentDetails.status !== true) {
    console.log('Failed payment for reference: ', reference);
    return Promise.reject(new Error('Payment failed'));
  }
  // Check if it is a duplicate verification
  const duplicate = await findOrderByReference({ reference });
  if (duplicate) return Promise.reject(new Error('Duplicate payment'));

  console.log('Successful payment for reference: ', reference);

  // Create order
  const orderDetails = paymentDetails['data']['metadata']['custom_fields'][0];
  orderDetails['reference'] = paymentDetails['data']['reference'];
  orderDetails['ip_address'] = paymentDetails['data']['ip_address'];
  orderDetails['fees'] = paymentDetails['data']['fees'];
  console.log(`Authorization for ${reference}: ${paymentDetails['data']['authorization']}`);
  console.log(
    `Creating order for reference: (from url ${reference})(from paystack ${orderDetails['reference']}), Fees: ${paymentDetails['data']['fees']}`
  );

  const order = await createOrder({ details: orderDetails });
  if (!order) {
    // reverse payment & email me
    console.log(
      `Order Creation failed for reference: (from url ${reference})(from paystack ${orderDetails['reference']})`
    );
    return Promise.reject(new Error('Failed to create order'));
  }

  console.log(
    `Created order successfully for reference: (from url ${reference})(from paystack ${orderDetails['reference']})`
  );

  // Add order to store
  const store = await getStoreByName({ storeName: order.store });
  if (!store) {
    return Promise.reject(new Error('Invalid store'));
  }
  await addOrderToStore({ store, order });

  // update the items
  await updateItemStatistics({ order });
  await sendNewOrderEmail(order, store.owner);
};

const getBanksInteractors = async ({ getBanks }) => {
  const banks = await getBanks();
  const bankNames = Object.keys(banks);
  return bankNames;
};

const payoutInteractor = async (
  { getStoreByName, getBanks, createRecipient, editStoreWallet, transferOut, createPayout },
  { name, account_number, bank, storeName, admin }
) => {
  // verify store
  const store = await getStoreByName({ storeName: storeName });
  if (!store) {
    return Promise.reject(new Error('Invalid store'));
  }
  const banks = await getBanks();

  // create reciepient ------
  const recipientDetails = {
    type: 'nuban',
    name: name,
    account_number: account_number,
    bank_code: banks[bank],
    currency: 'NGN',
  };
  const recipientResponse = await createRecipient({ recipientDetails });
  if (!recipientResponse) {
    return Promise.reject(new Error('Invalid account details'));
  }
  const recipientCode = recipientResponse.data.data.recipient_code;

  // do transfer --------
  const transferDetails = {
    source: 'balance',
    // amount: store.wallet * 100 * 0.01, // Collect service fee agreeded by store
    amount: 0, // Collect service fee agreeded by store
    recipient: recipientCode,
  };
  const transferResponse = await transferOut({ transferDetails });
  if (!transferResponse) {
    return Promise.reject(new Error('Something went wrong'));
  }
  const transferData = transferResponse.data.data;

  // update store
  await editStoreWallet({ store, amount: -1 * store.wallet });

  //create payout---
  const payout = await createPayout({ details: transferData, storeName: store.name, admin });

  return payout;
};

// =======STRIP INTERACTOR =========

const createCheckout = async (
  { createCheckoutUrl, getGroupedItems, getStoreByName },
  { items, storeName, userDetails }
) => {
  // verify store
  const store = await getStoreByName({ storeName: storeName });
  if (!store) {
    return Promise.reject(new Error('Invalid store'));
  }
  if (items.length <= 0 || !verifyUserDetails(userDetails)) {
    return 'https://myshopx.net';
  }
  const dereferencedItems = await getGroupedItems(items);
  const massagedItems = massageItems(dereferencedItems, true);
  const url = await createCheckoutUrl({ lineItems: massagedItems, userDetails, storeName });
  return url;
};

module.exports = {
  initTransactionInteractor,
  verifyPaymentInteractor,
  payoutInteractor,
  getBanksInteractors,
  createCheckout,
};
