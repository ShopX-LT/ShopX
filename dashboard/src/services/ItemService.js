const CREAT_ITEM_URL = '/api/item/create';

export async function createItem(axiosPrivate, formData) {
  try {
    console.log(formData);
    const response = await axiosPrivate.post(CREAT_ITEM_URL, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
