const {
  createReview,
  getReviewAuthor,
  getReviewWebsite,
  getReview,
  getAllReviews,
  updateReview,
  replaceReview,
  deleteReview,
  deleteAllReviews,
} = require("../../controllers/v3/reviewController");

const express = require("express");
const router = express.Router();

router.post("/", createReview);

router.get("/:id/author", getReviewAuthor);

router.get("/:id/website", getReviewWebsite);

router.get("/", getAllReviews);

router.get("/:id", getReview);

router.patch("/:id", updateReview);

router.put("/:id", replaceReview);

router.delete("/:id", deleteReview);

router.delete("/", deleteAllReviews);

module.exports = router;
