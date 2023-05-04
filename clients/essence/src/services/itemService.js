import axios from "../api/axios";

const ALL_ITEMS_URL = "/api/item/user/items";

export async function getAllItems({ options = "" }) {
  try {
    const response = await axios.get(`${ALL_ITEMS_URL}?options`);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}
