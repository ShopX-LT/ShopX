const express = require('express');
const { getStoreDesign } = require('../controllers/design/design');

const router = express.Router();

router.get('/:store', getStoreDesign);

module.exports = router;
