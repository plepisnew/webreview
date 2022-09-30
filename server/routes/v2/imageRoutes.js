const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImage,
  getAllImages,
  getSpecificImage,
  clearImages,
} = require("../../controllers/v2/imageController");

router.get("/images", getAllImages);

router.get("/images/:name", getSpecificImage);

router.delete("/images", clearImages);

router.post("/images", upload.single("uploadImage"), uploadImage);

module.exports = router;
