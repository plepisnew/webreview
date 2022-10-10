const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getSpecificReview,
  deleteSpecificReview,
  getReviewAdmin,
} = require("../../controllers/v1/reviewController");

router.get("/:id", getSpecificReview);

// TBD
// router.put("/:id", putSpecificAdmin);

// router.patch("/:id", patchSpecificAdmin);

router.delete("/:id", deleteSpecificReview);

router.get("/", getAllReviews);

router.post("/", createReview);

router.delete("/", deleteAllReviews);

router.get("/:id/writtenBy", getReviewAdmin);

module.exports = router;
