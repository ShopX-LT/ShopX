const CREAT_ITEM_URL = '/api/item/create';
const UPDATE_ITEM_URL = '/api/item/store/update';
const UPDATE_ITEM_IMAGE_URL = '/api/item/image/update';
const DELETE_ITEM_IMAGE_URL = '/api/item/image/delete';
const DELETE_ITEM_URL = '/api/item/store/remove';
const GET_ALL_ITEMS_URL = '/api/item/store/items';

export async function createItem(axiosPrivate, formData) {
  const response = await axiosPrivate.post(CREAT_ITEM_URL, formData);
  const newItem = response.data;
  if (!newItem) throw new Error('Failed to create item');

  return newItem;
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

export async function updateItemImages(axiosPrivate, toast, itemId, formData) {
  try {
    const response = await axiosPrivate.post(`${UPDATE_ITEM_IMAGE_URL}/${itemId}`, formData);
    toast.success('Images Updated');
    return response.data;
  } catch (error) {
    toast.error('Failed to update images');
    console.error(error);
    return null;
  }
}

export async function deleteItemImage(axiosPrivate, toast, itemId, imageId) {
  try {
    const response = await axiosPrivate.delete(`${DELETE_ITEM_IMAGE_URL}/${itemId}/${imageId}`);
    toast.success(`Image Deleted`);
    return response.data;
  } catch (error) {
    toast.error('Failed to delete image');
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
