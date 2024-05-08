const GET_STORENAME_URL = '/api/admin/storename';

export async function getStoreName(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_STORENAME_URL);
    return response.data.storename;
  } catch (error) {
    console.error(error);
    return null;
  }
}
