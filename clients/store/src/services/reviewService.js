const GET_ITEM_REVIEWS_URL = '/api/review/view';
const CREATE_REVIEW_URL = '/api/review/create';

export async function getItemReviews(axios, itemId) {
  try {
    const response = await axios.get(`${GET_ITEM_REVIEWS_URL}/${itemId}`);
    return response.data.reviews;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createreview(axios, review) {
  try {
    const body = review;
    const response = await axios.post(CREATE_REVIEW_URL, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
