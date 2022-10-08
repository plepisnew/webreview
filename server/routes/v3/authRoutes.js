const express = require("express");
const router = express.Router();
const { login, register } = require("../../controllers/v3/authController");

router.post("/login", login);

router.post("/register", register);

module.exports = router;
