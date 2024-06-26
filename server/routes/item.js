const express = require('express');
const multer = require('multer');
const {
  createItem,
  getAllItemsForStore,
  getItemForUser,
  getAllItemsForUser,
  deleteById,
  updateItemImages,
  deleteItemImage,
  updateItemById,
  handleSearch,
} = require('../controllers/item/item');

// MIDDLEWARE
const { verifyToken } = require('../middleware/auth');

// MULTER SETUP
const storage = multer.memoryStorage({});
// only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Incorrect file type'), false);
  }
};
// max file size is 25mb
const upload = multer({
  storage: storage, // Allow the Authorization header
  fileFilter: fileFilter, // only accept images
  limits: { fieldSize: 40 * 1024 * 1024 }, //40mb max
});

// ROUTES
const router = express.Router();

// STORE ONLY ROUTES
router.post('/create', verifyToken, upload.array('images'), createItem);
router.post('/image/update/:id', verifyToken, upload.array('images'), updateItemImages);
router.delete('/image/delete/:itemId/:imageId', verifyToken, deleteItemImage);
// router.get('/store/:id', verifyToken, getItem);
router.get('/store/items', verifyToken, getAllItemsForStore);
router.put('/store/update/:id', verifyToken, updateItemById);
router.delete('/store/remove/:id', verifyToken, deleteById);

//
router.get('/user/items', getAllItemsForUser);
router.get('/user/:searchParam', handleSearch);

router.get('/user/id/:id', getItemForUser);

module.exports = router;
