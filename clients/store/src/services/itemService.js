const ALL_ITEMS_URL = '/api/item/user/items';
const GET_ITEM_URL = '/api/item/user/id';
const SEARCH_ITEM_URL = '/api/item/user';

export async function getAllItems(axios) {
  try {
    const response = await axios.get(`${ALL_ITEMS_URL}`);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchItems(axios, searchParam) {
  try {
    const response = await axios.get(`${SEARCH_ITEM_URL}/${searchParam}`);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function queryItems(axios, category, fields) {
  try {
    const fieldQuery = buildQuery(category, fields);
    const response = await axios.get(`${ALL_ITEMS_URL}${fieldQuery}`);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getItem(axios, { id }) {
  try {
    const response = await axios.get(`${GET_ITEM_URL}/${id}`);
    return response.data.item;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const buildQuery = (category, fields) => {
  const params = new URLSearchParams();

  Object.entries(fields).forEach(([key, values]) => {
    values.forEach((value) => {
      params.append(key, value);
    });
  });

  if (category) {
    params.append('category', category);
  }

  return `?${params.toString()}`;
};
