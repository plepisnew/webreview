const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteAllUsers,
  deleteAllUsers,
  deleteSpecificUser,
  patchSpecificUser,
  putSpecificUser,
  getSpecificUser,
  getUserReview,
  getUserReviews,
} = require("../controllers/usercontroller");
const { getAllReviews } = require("../controllers/reviewController");

router.get("/:id", getSpecificUser);

router.put("/:id", putSpecificUser);

router.patch("/:id", patchSpecificUser);

router.delete("/:id", deleteSpecificUser);

router.get("/id", getUserReview)

router.get("/", getAllUsers);

router.post("/", createUser);

router.delete("/", deleteAllUsers);

router.get("/", getUserReviews)

module.exports = router;