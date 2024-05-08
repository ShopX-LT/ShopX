const GET_CATEGORIES_URL = '/api/category';
const POST_CATEGORIES_URL = '/api/category';
const DELETE_CATEGORIES_URL = '/api/category';
const EDIT_CATEGORIES_URL = '/api/category';

/**
 * Retrieves the categories from the server using the provided axios instance.
 * @param {AxiosInstance} axiosPrivate - The axios instance with the necessary authorization headers.
 * @returns {Promise<Array>} - A promise that resolves to an array of category objects.
 * If an error occurs, an error message is logged to the console and an alert is displayed to the user.
 * If the request fails, null is returned.
 */
export async function getCategories(axiosPrivate) {
  const response = await axiosPrivate.get(GET_CATEGORIES_URL);
  const categories = response.data;
  if (!categories) throw new Error("Sorry, I wasn't able to retrieve your categories.");
  return categories;
}

/**
 * Creates a new category using a POST request to the server.
 * @param {AxiosInstance} axiosPrivate - The axios instance with the necessary authorization headers.
 * @param {string} category - The name of the category to create.
 * @returns {Promise<Object|null>} - A Promise that resolves to the created category object or null if there was an error.
 * @throws {Error} - If there was an error creating the category.
 */
export async function createCategory(axiosPrivate, category) {
  const response = await axiosPrivate.post(POST_CATEGORIES_URL, category);
  const categories = response.data;
  if (!categories) throw new Error('Failed to create field');
  return categories;
}

export async function deleteCategory(axiosPrivate, toast, categoryId, categoryName) {
  try {
    const response = await axiosPrivate.delete(DELETE_CATEGORIES_URL, { data: { id: categoryId } });
    toast.success(`${categoryName} category deleted`);
    return response.data;
  } catch (error) {
    toast.error('Error deleting Category, wait a moment and try again');

    return null;
  }
}

// export async function editCategory(axiosPrivate, toast, category) {
//   try {
//     const response = await axiosPrivate.patch(EDIT_CATEGORIES_URL, category);
//     toast.success(`${category} category changed`);
//     return response.data;
//   } catch (error) {
//     toast.error('Error changing Category, wait a moment and try again');

//     return null;
//   }
// }
