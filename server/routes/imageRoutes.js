const express = require("express");
const router = express.Router();
const { upload, uploadImage } = require("../controllers/imageController");

router.post("/upload", upload.single("uploadImage"), uploadImage);

module.exports = router;
