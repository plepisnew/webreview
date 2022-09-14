const User = require("../model/Admin");
const Review = require("../model/Review");

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

const getUserReviews = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId); 
    if (!user)
      return res
        .status(404)
        .json({ message: `Can't find User with ObjectId ${userId}` }); 
    const reviews = await user.writtenReviews;
    if (!reviews){
      return res
        .status(404)
        .json({ message: `Can't find Reviews by User with ObjectId ${userId}` }); 
    res.status(200).json(user); 
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await User.findById(reviewId); 
    if (!review)
      return res
        .status(404)
        .json({ message: `Can't find Review with ObjectId ${reviewId}` });
    const userId = review.publishedBy; 
    const user = await User.findById(userId); 
    if (!user)
      return res
        .status(404)
        .json({ message: `Can't find User with ObjectId ${userId}` }); 
    res.status(200).json(user);
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
  getUserReviews,
  getUserReview,
};
