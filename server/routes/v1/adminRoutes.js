const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  createAdmin,
  deleteAllAdmins,
  getSpecificAdmin,
  putSpecificAdmin,
  patchSpecificAdmin,
  deleteSpecificAdmin,
} = require("../../controllers/v1/adminController");

router.get("/:id", getSpecificAdmin);

router.put("/:id", putSpecificAdmin);

router.patch("/:id", patchSpecificAdmin);

router.delete("/:id", deleteSpecificAdmin);

router.get("/", getAllAdmins);

router.post("/", createAdmin);

router.delete("/", deleteAllAdmins);

module.exports = router;
