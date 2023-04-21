const GET_ORDERS_URL = '/api/admin/order';

/**
 * Retrieves the orders data from the server using the provided axios instance.
 * @param {AxiosInstance} axiosPrivate - The axios instance with the necessary authentication headers.
 * @returns {Promise} A promise that resolves with the orders data or null if there was an error.
 * If there is an error, an error message will be logged to the console and an alert will be displayed.
 */
export async function getOrders(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_ORDERS_URL);
    return response.data.orders;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
