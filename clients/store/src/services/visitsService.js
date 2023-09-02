const ADD_TO_VISIT_URL = '/api/user/visit';

export async function addStoreVisit(axios, isNewVisitor) {
  try {
    const response = await axios.post(`${ADD_TO_VISIT_URL}`, { isNewVisitor });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
