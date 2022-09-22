const User = require("../model/User");
const Review = require("../model/Review");

// TODO: add filtering with query params

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
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
    res.status(404).json({ message: err.message }); // Invalid id
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

const deleteAllUsers = async (req, res) => {
  const { deletedCount } = await User.deleteMany({});
  res.status(200).json({
    message: `Deleted ${deletedCount} ${deletedCount === 1 ? "user" : "users"}`,
  });
};

const deleteSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) return res.status(200).json(user);
    res
      .status(400)
      .json({ message: `Can't find User with ObjectId ${userId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllUserReviews = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("writtenReviews");
    if (user) {
      return res.status(200).json(user.writtenReviews);
    }
    res
      .status(404)
      .json({ message: `Can't find User with ObjectId ${userId}` });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createUserReview = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      const review = await Review.create({ writtenBy: userId, ...req.body });
      const updatedUser = await User.findByIdAndUpdate(userId, {
        writtenReviews: [...user.writtenReviews, review._id],
      });
      return res.status(200).json(updatedUser);
    }
    res
      .status(404)
      .json({ message: `Can't find User with ObjectId ${userId}` });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getSpecificUserReview = async (req, res) => {
  const userId = req.params.id;
  const reviewId = req.params.review_id;

  try {
    const user = await User.find({
      _id: userId,
      writtenReviews: { $in: [reviewId] },
    });
    const review = await Review.find({
      writtenBy: userId,
      _id: reviewId,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteSpecificUserReview = async (req, res) => {
  const reviewId = req.params.review_id;
try{
  const review = await Review.findByIdAndDelete(reviewId);
  if (review) return res.status(200).json(review); 
  res
  .status(404)
  .json({ message: `Can't find Review by User with ObjectId ${userId}` });} catch (err){
  res.status(404).json({ message: err.message })
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
  getAllUserReviews,
  createUserReview,
  getSpecificUserReview,
  deleteSpecificUserReview,
};
