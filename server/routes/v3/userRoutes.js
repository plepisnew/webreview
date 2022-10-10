const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  replaceUser,
  deleteUser,
  deleteAllUsers,
} = require("../../controllers/v3/userController");

const express = require("express");
const router = express.Router();

router.post("/", createUser);

router.get("/:id", getUser);

router.get("/", getAllUsers);

router.patch("/:id", updateUser);

router.put("/:id", replaceUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteAllUsers);

module.exports = router;
