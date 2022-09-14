const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteAllUsers,
  deleteSpecificUser,
  patchSpecificUser,
  putSpecificUser,
  getSpecificUser,
  getUserReviews,
  createUserReview,
} = require("../controllers/usercontroller");

router.get("/:id", getSpecificUser);

router.get("/:id/reviews", getUserReviews);

router.put("/:id", putSpecificUser);

router.patch("/:id", patchSpecificUser);

router.post("/:id/reviews", createUserReview);

router.delete("/:id", deleteSpecificUser);

router.get("/", getAllUsers);

router.post("/", createUser);

router.delete("/", deleteAllUsers);

module.exports = router;
