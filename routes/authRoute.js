const express = require("express");

const authenticateAdmin = require('../controllers/authController');

const router = express.Router();

router.post("/auth", authenticateAdmin);

module.exports = router;