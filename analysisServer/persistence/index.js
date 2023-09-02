const { getAllItems } = require('./ItemPersistence');
const { getImagesUrlFromS3Buscket } = require('./AWSPersistence');

module.exports = {
  // AWS PERSISTENCE
  getImagesUrlFromS3Buscket,
  // ITEM PERSISTENCE
  getAllItems,
};
