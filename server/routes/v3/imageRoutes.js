const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImage,
  uploadProfilePicture,
  getAllImages,
  getImageNames,
  getSpecificImage,
  clearImages,
} = require("../../controllers/v3/imageController");

router.get("/images", getAllImages);

router.get("/images/names", getImageNames);

router.get("/images/:name", getSpecificImage);

router.delete("/images", clearImages);

router.post("/images/pfp", upload.single("uploadImage"), uploadProfilePicture);

router.post("/images", upload.single("uploadImage"), uploadImage);

// router.post("/images/pfp", upload.single("uploadImage"), uploadProfilePicture);

// router.post("/images", upload.single("uploadImage"), uploadImage);

module.exports = router;
