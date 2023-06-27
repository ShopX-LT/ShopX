import axios from "../api/axios";

const ALL_ITEMS_URL = "/api/item/user/items";
const GET_ITEM_URL = "/api/item/user/id";

export async function getAllItems() {
  try {
    const response = await axios.get(`${ALL_ITEMS_URL}`);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getItem({ id }) {
  try {
    const response = await axios.get(`${GET_ITEM_URL}/${id}`);
    return response.data.item;
  } catch (error) {
    console.log(error);
    return null;
  }
}
