const GET_STATS_URL = '/api/admin/stats';

export async function getStoreStats(axiosPrivate) {
  try {
    const response = await axiosPrivate.get(GET_STATS_URL);
    return response.data.stats;
  } catch (error) {
    console.error(error);
    alert(error.message);
    return null;
  }
}
