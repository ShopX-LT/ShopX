const GET_CATEGORIES_URL = '/api/category';
const POST_CATEGORIES_URL = '/api/category';

/**
 * Retrieves the categories from the server using the provided axios instance.
 * @param {AxiosInstance} axiosPrivate - The axios instance with the necessary authorization headers.
 * @returns {Promise<Array>} - A promise that resolves to an array of category objects.
 * If an error occurs, an error message is logged to the console and an alert is displayed to the user.
 * If the request fails, null is returned.
 */
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

/**
 * Creates a new category using a POST request to the server.
 * @param {AxiosInstance} axiosPrivate - The axios instance with the necessary authorization headers.
 * @param {string} category - The name of the category to create.
 * @returns {Promise<Object|null>} - A Promise that resolves to the created category object or null if there was an error.
 * @throws {Error} - If there was an error creating the category.
 */
export async function createCategory(axiosPrivate, category) {
  try {
    const response = await axiosPrivate.post(POST_CATEGORIES_URL, category);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
