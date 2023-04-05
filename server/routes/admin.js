const express = require("express");

// CONTROLLERS
const { signUp } = require("../controllers/storeAuth");
// MIDDLEWARE
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signUp);

module.exports = router;
