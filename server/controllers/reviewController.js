const Review = require("../model/Review");
const Admin = require("../model/Admin");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllReviews = async (req, res) => {
  const { deletedCount } = await Review.deleteMany({});
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
    if (review) return res.status(200).json(review);
    res
      .status(400)
      .json({ message: `Can't find Review with ObjectId ${reviewId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecificReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(adminId);
    if (review) return res.status(200).json(review);
    res
      .status(400)
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
        .status(400)
        .json({ message: `Can't find Review with ObjectId ${reviewId}` });
    const adminId = review.monitoredBy;
    const admin = await Admin.findById(adminId);
    if (!admin)
      return res
        .status(400)
        .json({ message: `Can't find Admin with ObjectId ${adminId}` });
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getSpecificReview,
  deleteSpecificReview,
  getReviewAdmin,
};
