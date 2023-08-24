const CHECK_STORE_NAME = '/api/admin/checkstorename';

export async function checkStoreName(axiosPrivate, storeName) {
  try {
    const response = await axiosPrivate.post(CHECK_STORE_NAME, { storeName });
    return response.data;
  } catch (error) {
    // console.error(error);
    // alert(error.message);
    return null;
  }
}
