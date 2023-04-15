const GET_CATEGORIES_URL = '/api/category';
const POST_CATEGORIES_URL = '/api/category';

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

export async function createCategory(axiosPrivate, category) {
  try {
    const response = await axiosPrivate.post(POST_CATEGORIES_URL, { name: category });
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
