import axios from "../api/axios";

const GET_CATEGORIES_URL = "/api/category/user";
const GET_CUSTOM_CATEGORIES_URL = "/api/category/custom";

export async function getAllCategories() {
  try {
    const response = await axios.get(`${GET_CATEGORIES_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCustomCategories() {
  try {
    const response = await axios.get(`${GET_CUSTOM_CATEGORIES_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
