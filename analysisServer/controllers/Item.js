const {
  // ITEM INTERACTORS
  getTopSalesInteractor,
  // ERROR INTERACTORS
  // handleErrorInteractor,
} = require('../Interactors/index');
const persistence = require('../persistence/index');

const handleGetTopSales = async (req, res) => {
  try {
    const { store } = req.auth;
    const items = await getTopSalesInteractor(persistence, { storeName: store });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error performing analysis' });
  }
};

module.exports = {
  handleGetTopSales,
};
