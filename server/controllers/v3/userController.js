const User = require("../../model/User");

/*
 * [do]User - action on single User entity
 * [do]AllUsers - action on all User entities
 */

/* CREATING USER */

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* READING USER */

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (user) return res.status(200).json(user);
    res.status(404).json({ message: `User ${userId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(req.query).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATING USER */

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body).select(
      "-password"
    );
    if (user) return res.status(200).json(user);
    res.status(404).json({ message: `User ${userId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const replaceUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: userId }, req.body).select(
      "-password"
    );
    if (user) return res.status(200).json(user);
    res.status(404).json({ message: `User ${userId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETING USER */

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId).select("-password");
    if (user) return res.status(200).json(user);
    res.status(404).json({ message: `User ${userId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllUsers = async (req, res) => {
  const { deletedCount } = await User.deleteMany({}).select("-password");
  res.status(200).json({
    message: `Deleted ${deletedCount} ${deletedCount === 1 ? "user" : "users"}`,
  });
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  replaceUser,
  deleteUser,
  deleteAllUsers,
};
