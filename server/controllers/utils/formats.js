const formatUser = (user) => {
  return { email: user.email };
};

const formatCategory = (category) => {
  return { id: category.id, name: category.name };
};

const formatItem = (item) => {
  return {
    id: item._id,
    title: item.title,
    price: item.price,
    category: item.category,
    imagePath: item.imagePath,
    amount: item.amount,
    discount: item.discount,
    quantity: item.quantity,
    displayPrice: item.price * (1 - item.discount / 100),
  };
};

const formatStore = (store) => {
  return {
    name: store.name,
    wallet: store.wallet,
    categories: store.categories,
    itemTemplate: store.itemTemplate,
    // STATISTICS
    // earnings
    totalEarning: store.totalEarning, //all time earnings made on the app
    weeklyEarning: store.weeklyEarning,
    weeklyEarningHistory: store.weeklyEarningHistory,
    dailyEarning: store.dailyEarning,
    dailyEarningHistory: store.dailyEarningHistory,
    // sales
    totalSales: store.totalSales, //all time earnings made on the app
    weeklySales: store.weeklySales,
    weeklySalesHistory: store.weeklySalesHistory,
    dailySales: store.dailySales,
    dailySalesHistory: store.dailySalesHistory,
    // Visits
    totalVisits: store.totalVisits, //all time earnings made on the app
    weeklyVisits: store.weeklyVisits,
    weeklyVisitsHistory: store.weeklyVisitsHistory,
    dailyVisits: store.dailyVisits,
    dailyVisitsHistory: store.dailyVisitsHistory,
  };
};
module.exports = {
  formatUser,
  formatStore,
  formatCategory,
  formatItem,
};
