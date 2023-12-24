const CREAT_ITEM_URL = '/api/item/create';
const UPDATE_ITEM_URL = '/api/item/store/update';
const UPDATE_ITEM_IMAGE_URL = '/api/item/update';
const DELETE_ITEM_URL = '/api/item/store/remove';
const GET_ALL_ITEMS_URL = '/api/item/store/items';

export async function createItem(axiosPrivate, toast, formData) {
  try {
    const response = await axiosPrivate.post(CREAT_ITEM_URL, formData);
    toast.success('Item Created');
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return null;
  }
}

export async function updateItem(axiosPrivate, toast, id, formData) {
  try {
    const response = await axiosPrivate.put(`${UPDATE_ITEM_URL}/${id}`, formData);
    toast.success('Item Updated');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateItemImages(axiosPrivate, toast, id, formData) {
  try {
    console.log(formData);
    const response = await axiosPrivate.post(`${UPDATE_ITEM_IMAGE_URL}/${id}`, formData);
    toast.success('Images Updated');
    return response.data;
  } catch (error) {
    toast.error('Failed to update images');
    console.error(error);
    return null;
  }
}

export async function deleteItem(axiosPrivate, id) {
  try {
    const response = await axiosPrivate.delete(`${DELETE_ITEM_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllItems(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_ALL_ITEMS_URL);
    return response.data.items;
  } catch (error) {
    console.error(error);
    return null;
  }
}
