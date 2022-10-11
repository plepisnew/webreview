const Review = require("../../model/Review");
const User = require("../../model/User");
const Website = require("../../model/Website");

/* CREATING REVIEW */

const createReview = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    if (user) {
      const websiteName = req.body.website;
      const website = await Website.findOne({ name: websiteName });
      if (website) {
        const review = await Review.create({
          ...req.body,
          writtenBy: user._id,
          website: website._id,
        });
        user.writtenReviews.push(review);
        await user.save();
        return res.status(201).json(review);
      }
      return res
        .status(404)
        .json({ message: `Website ${websiteName} not found` });
    }
    res.status(404).json({ message: `User ${username} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* READING REVIEW */

const getReviewAuthor = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId).populate("writtenBy");
    if (review) return res.status(200).json(review.writtenBy);
    res.status(400).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReviewWebsite = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId).populate("website");
    if (review) return res.status(200).json(review.website);
    res.status(400).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId)
      .populate("writtenBy")
      .populate("website");
    if (review) return res.status(200).json(review);
    res.status(400).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    if (req.query.username) {
      const user = await User.findOne({
        username: req.query.username,
      });
      const userReviews = await Review.find({
        isPending: req.query.isPending,
        writtenBy: user._id,
      })
        .sort({
          createdAt: -1,
        })
        .populate("website")
        .populate("writtenBy");
      console.log(userReviews);
      return res.status(200).json(userReviews);
    }
    const reviews = await Review.find(req.query)
      .sort({ createdAt: -1 })
      .populate("writtenBy")
      .populate("website");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATING REVIEW */

const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByIdAndUpdate(reviewId, req.body);
    if (review) return res.status(200).json(review);
    res.status(404).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const replaceReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findOneAndReplace({ _id: reviewId }, req.body);
    if (review) return res.status(200).json(review);
    res.status(404).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (review) {
      const user = await User.findById(review.writtenBy);
      user.writtenReviews = user.writtenReviews.filter((review) => {
        return review != reviewId;
      });
      await user.save();
      if (review) return res.status(200).json(review);
      return res.status(404).json({ message: `Review ${reviewId} not found` });
    }
    res.status(404).json({ message: `Review ${reviewId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllReviews = async (req, res) => {
  const { deletedCount } = await Review.deleteMany({});
  await User.updateMany({}, { writtenReviews: [] });
  res.status(200).json({
    message: `Deleted ${deletedCount} ${
      deletedCount === 1 ? "review" : "reviews"
    }`,
  });
};

module.exports = {
  createReview,
  getReviewAuthor,
  getReviewWebsite,
  getReview,
  getAllReviews,
  updateReview,
  replaceReview,
  deleteReview,
  deleteAllReviews,
};
