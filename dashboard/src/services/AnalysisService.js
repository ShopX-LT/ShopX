const GET_TOP_SALES_URL = 'api/analysis/item/top-sales';

export const getTopSales = async (axios) => {
  const response = await axios.get(GET_TOP_SALES_URL);
  return response.data.items;
};
