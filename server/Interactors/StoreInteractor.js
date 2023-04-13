const createStoreInteractor = async ({ getStore, createStore }, { storeName, email }) => {
  // check if the store name already exists
  const store = await getStore({ storeName });
  if (store) {
    throw new Error('Store already exists');
  }

  const newStore = await createStore({ storeName, email });
  const formattedStore = formatStore(newStore);
  return { formattedStore };
};

const storeLogin = async ({ getStoreByNameAndEmail }, { storeName, email }) => {
  const store = await getStoreByNameAndEmail({ storeName, email });
  if (!store) {
    throw new Error('Invalid store');
  }
  const formattedStore = formatStore(store);
  return formattedStore;
};

const formatStore = (store) => {
  return {
    name: store?.name,
    wallet: store?.wallet,
    categories: store?.categories,
    itemTemplate: store?.itemTemplate,
    // STATISTICS
    // earnings
    totalEarning: store?.totalEarning, //all time earnings made on the app
    weeklyEarning: store?.weeklyEarning,
    weeklyEarningHistory: store?.weeklyEarningHistory,
    dailyEarning: store?.dailyEarning,
    dailyEarningHistory: store?.dailyEarningHistory,
    // sales
    totalSales: store?.totalSales, //all time earnings made on the app
    weeklySales: store?.weeklySales,
    weeklySalesHistory: store?.weeklySalesHistory,
    dailySales: store?.dailySales,
    dailySalesHistory: store?.dailySalesHistory,
    // Visits
    totalVisits: store?.totalVisits, //all time earnings made on the app
    weeklyVisits: store?.weeklyVisits,
    weeklyVisitsHistory: store?.weeklyVisitsHistory,
    dailyVisits: store?.dailyVisits,
    dailyVisitsHistory: store?.dailyVisitsHistory,
  };
};

module.exports = {
  createStoreInteractor,
  storeLogin,
};
