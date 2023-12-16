const Review = require('../models/Review');

const createReview = async ({ email, name, itemId, rating, comment }) => {
  try {
    const review = new Review({
      email,
      name,
      itemId,
      rating,
      comment,
      date: Date.now(),
    });

    return await review.save();
  } catch (error) {
    console.error('review Persistence error in createReview()', error);
    return null;
  }
};

const getProductReviews = async ({ itemId }) => {
  try {
    const reviews = await Review.find({ itemId }).exec();
    return reviews;
  } catch (error) {
    console.error('Review Persistence error in getProductReviews()', error);
    return null;
  }
};

module.exports = {
  createReview,
  getProductReviews,
};
