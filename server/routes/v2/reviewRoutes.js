const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getAllReviewsWithAuthors,
  getAllReviewsPopulated,
  createReview,
  deleteAllReviews,
  getSpecificReview,
  deleteSpecificReview,
  getReviewAdmin,
  getReviewAuthor,
} = require("../../controllers/v2/reviewController");

router.get("/inflate_author", getAllReviewsWithAuthors);

router.get("/inflate", getAllReviewsPopulated);

router.get("/:id", getSpecificReview);
// TBD
// router.put("/:id", putSpecificAdmin);

// router.patch("/:id", patchSpecificAdmin);

router.delete("/:id", deleteSpecificReview);

router.get("/", getAllReviews);

router.post("/", createReview);

router.delete("/", deleteAllReviews);

router.get("/:id/monitoredBy", getReviewAdmin);

router.get("/:id/writtenBy", getReviewAuthor);

module.exports = router;
