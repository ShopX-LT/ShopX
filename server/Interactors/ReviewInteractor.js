const getItemReviewsInteractor = async ({ getProductReviews }, { itemId }) => {
  if (!itemId) {
    return Promise.reject(new Error('No item ID'));
  }
  const reviews = await getProductReviews({ itemId });
  console.log(reviews);
  return reviews;
};

const createReviewInteractor = async ({ createReview }, { email, name, itemId, rating, comment }) => {
  if (!itemId || !comment) {
    return Promise.reject(new Error('Could not create review. Missing Item or comment'));
  }
  const review = await createReview({ email, name, itemId, rating, comment });
};

module.exports = {
  getItemReviewsInteractor,
  createReviewInteractor,
};
