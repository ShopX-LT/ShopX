const CREAT_ITEM_URL = '/api/item/create';
const GET_ALL_ITEMS_URL = '/api/item/store/items';

export async function createItem(axiosPrivate, formData) {
  try {
    const response = await axiosPrivate.post(CREAT_ITEM_URL, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}

export async function getAllItems(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_ALL_ITEMS_URL);
    return response.data.items;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
