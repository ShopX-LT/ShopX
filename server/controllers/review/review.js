const {
  getItemReviewsInteractor,
  createReviewInteractor, // ERROR INTERACTORS
  handleErrorInteractor,
} = require('../../Interactors/index');
const persistence = require('../../persistence/index');

const handleCreateReview = async (req, res) => {
  try {
    const { email, name, itemId, rating, comment } = req.body;

    await createReviewInteractor(persistence, { email, name, itemId, rating, comment });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

const handleGetItemReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await getItemReviewsInteractor(persistence, { itemId: id });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    handleErrorInteractor(error, res);
  }
};

module.exports = {
  handleCreateReview,
  handleGetItemReviews,
};
