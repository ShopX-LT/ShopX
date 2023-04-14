const GET_CATEGORIES_URL = '/api/category';

export async function getCategories(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_CATEGORIES_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
