const Review = require("../../model/Review");
const Admin = require("../../model/Admin");
const User = require("../../model/User");
const { buildResponse } = require("./hateoas");

const response = ({ id, payload }) =>
  buildResponse({ entity: "Review", id, payload });

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({ ...req.query });
  res.status(200).json(response({ payload: reviews }));
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(response({ payload: review, id: review._id }));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllReviews = async (req, res) => {
  const { deletedCount } = await Review.deleteMany({ ...req.query });
  res.status(200).json({
    message: `Deleted ${deletedCount} ${
      deletedCount === 1 ? "review" : "reviews"
    }`,
  });
};

const getSpecificReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId);
    if (review)
      return res.status(200).json(response({ payload: review, id: reviewId }));
    res
      .status(404)
      .json({ message: `Can't find Review with ObjectId ${reviewId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecificReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(adminId);
    if (review)
      return res.status(200).json(response({ payload: review, id: reviewId }));
    res
      .status(404)
      .json({ message: `Can't find Review with ObjectId ${reviewId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReviewAdmin = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId);
    if (!review)
      return res
        .status(404)
        .json({ message: `Can't find Review with ObjectId ${reviewId}` });
    const adminId = review.monitoredBy;
    const admin = await Admin.findById(adminId);
    if (!admin)
      return res
        .status(404)
        .json({ message: `Can't find Admin with ObjectId ${adminId}` });
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReviewAuthor = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId);
    if (!review)
      return res
        .status(404)
        .json({ messagea: `Can't find Review with ObjectId ${reviewId}` });
    const userId = review.writtenBy;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ messagea: `Can't find User with ObjectId ${reviewId}` });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ messagea: err.message });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getSpecificReview,
  deleteSpecificReview,
  getReviewAdmin,
  getReviewAuthor,
};
