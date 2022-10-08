const {
  createWebsite,
  getWebsite,
  getAllWebsites,
  getWebsiteReviews,
  updateWebsite,
  replaceWebsite,
  deleteWebsite,
  deleteAllWebsites,
} = require("../../controllers/v3/websiteController");

const express = require("express");
const router = express.Router();

router.post("/", createWebsite);

router.get("/:id", getWebsite);

router.get("/:id/reviews", getWebsiteReviews);

router.get("/", getAllWebsites);

router.patch("/:id", updateWebsite);

router.put("/:id", replaceWebsite);

router.delete("/:id", deleteWebsite);

router.delete("/", deleteAllWebsites);

module.exports = router;
