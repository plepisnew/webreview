const express = require("express");
const router = express.Router();
const {
  getAllWebsites,
  getCreator,
  createWebsite,
  deleteAllWebsites,
  getSpecificWebsite,
  putSpecificWebsite,
  patchSpecificWebsite,
  deleteSpecificWebsite,
  getReviewAdmin,
} = require("../../controllers/v1/websiteController");

router.get("/:id", getSpecificWebsite);

router.put("/:id", putSpecificWebsite);

router.patch("/:id", patchSpecificWebsite);

router.delete("/:id", deleteSpecificWebsite);

router.get("/", getAllWebsites);

router.post("/", createWebsite);

router.delete("/", deleteAllWebsites);

router.get("/:id/createdBy", getCreator);

module.exports = router;
