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
} = require("../controllers/usercontroller");

router.get("/:id", getSpecificUser);

router.put("/:id", putSpecificUser);

router.patch("/:id", patchSpecificUser);

router.delete("/:id", deleteSpecificUser);

router.get("/", getAllUsers);

router.post("/", createUser);

router.delete("/", deleteAllUsers);

module.exports = router;