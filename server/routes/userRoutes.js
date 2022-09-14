const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSpecificUser,
  createUser,
  deleteAllUsers,
  deleteSpecificUser,
  patchSpecificUser,
  putSpecificUser,
  getAllUserReviews,
  getSpecificUserReview,
  createUserReview,
  deleteSpecificUserReview,
} = require("../controllers/userController");

/* User CRUD */

router.get("/", getAllUsers);

router.get("/:id", getSpecificUser);

router.post("/", createUser);

router.put("/:id", putSpecificUser);

router.patch("/:id", patchSpecificUser);

router.delete("/:id", deleteSpecificUser);

router.delete("/", deleteAllUsers);

/* User relationships */

router.get("/:id/reviews", getAllUserReviews);

router.post("/:id/reviews", createUserReview);

router.get("/:id/reviews/:review_id", getSpecificUserReview);

router.delete("/:id/reviews/:review_id", deleteSpecificUserReview);

module.exports = router;