const GET_DESIGN_URL = '/api/design';

export async function getStoreDesign(axios, storeName) {
  try {
    const response = await axios.get(`${GET_DESIGN_URL}/${storeName}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
