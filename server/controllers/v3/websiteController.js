const Website = require("../../model/Website");
const Review = require("../../model/Review");

/* CREATING WEBSITE */

const createWebsite = async (req, res) => {
  try {
    const website = await Website.create(req.body);
    res.status(201).json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* READING WEBSITE */

const getWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);
    if (website) {
      const reviews = await Review.find({ website: website._id });
      const averageRating =
        reviews.reduce(
          (previousValue, review) => previousValue + review.rating,
          0
        ) / reviews.length;
      return res.status(200).json({
        website,
        averageRating,
      });
    }
    res.status(404).json({ message: `Website ${websiteId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find(
      req.query.name
        ? {
            name: { $regex: req.query.name, $options: "/i" },
          }
        : req.query
    );
    const websitesWithRating = await Promise.all(
      websites.map(async (website) => {
        const reviews = await Review.find({ website: website._id });
        const averageRating =
          reviews.reduce(
            (previousValue, review) => previousValue + review.rating,
            0
          ) / reviews.length;
        return {
          website,
          averageRating: averageRating || 1,
        };
      })
    );
    res.status(200).json(websitesWithRating);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getWebsiteReviews = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);

    if (website) {
      const reviews = await Review.find({ website: website._id })
        .populate("writtenBy")
        .populate("website");
      return res.status(200).json(reviews);
    }
    res.status(404).json({ message: `Website ${websiteId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATING WEBSITE */

const updateWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findByIdAndUpdate(websiteId, req.body);
    if (website) return res.status(200).json(website);
    res.status(404).json({ message: `Website ${websiteId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const replaceWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findOneAndReplace(
      { _id: websiteId },
      req.body
    );
    if (website) return res.status(200).json(website);
    res.status(404).json({ message: `Website ${websiteId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETING WEBSITE */

const deleteWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findByIdAndDelete(websiteId);
    if (website) return res.status(200).json(website);
    res.status(400).json({ message: `Website ${websiteId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllWebsites = async (req, res) => {
  const { deletedCount } = await Website.deleteMany({});
  res.status(200).json({
    message: `Deleted ${deletedCount} ${
      deletedCount === 1 ? "website" : "websites"
    }`,
  });
};

module.exports = {
  createWebsite,
  getWebsite,
  getAllWebsites,
  getWebsiteReviews,
  updateWebsite,
  replaceWebsite,
  deleteWebsite,
  deleteAllWebsites,
};
