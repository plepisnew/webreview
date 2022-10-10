const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  getAdmin,
  createAdmin,
} = require("../../controllers/v3/adminController");

router.get("/", getAllAdmins);

router.get("/:id", getAdmin);

router.post("/", createAdmin);

module.exports = router;
