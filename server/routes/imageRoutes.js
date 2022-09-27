const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImage,
  getAllImages,
  getSpecificImage,
} = require("../controllers/imageController");

router.get("/images", getAllImages);

router.get("/images/:name", getSpecificImage);

// router.post("/images", upload.single("uploadImage"), uploadImage);
router.post("/images", uploadImage);

module.exports = router;
