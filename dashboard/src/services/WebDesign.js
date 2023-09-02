const GET_DESIGN_URL = '/api/admin/design';
const UPDATE_DESIGN_URL = '/api/admin/design';

export async function getStoreDesign(axios) {
  try {
    const response = await axios.get(GET_DESIGN_URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateStoreDesign(axios, update) {
  try {
    const response = await axios.put(UPDATE_DESIGN_URL, update);
    return response.data;
  } catch (error) {
    return null;
  }
}
