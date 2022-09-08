const User = require("../model/Admin");

// TODO: add filtering with query params

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllUsers = async (req, res) => {
  const { deletedCount } = await User.deleteMany({});
  res.status(200).json({
    message: `Deleted ${deletedCount} ${
      deletedCount === 1 ? "user" : "users"
    }`,
  });
};

const getSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) return res.status(200).json(user); // Valid and existent id
    res
      .status(400)
      .json({ message: `Can't find User with ObjectId ${userId}` }); // Valid and non-existent id
  } catch (err) {
    res.status(400).json({ message: err.message }); // Invalid id
  }
};

const putSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: userId }, req.body); // Replaces admin with body
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const patchSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body); // Updates admin with body
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) return res.status(200).json(user);
    res
      .status(400)
      .json({ message: `Can't find User with ObjectId ${adminId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteAllUsers,
  getSpecificUser,
  putSpecificUser,
  patchSpecificUser,
  deleteSpecificUser,
};
