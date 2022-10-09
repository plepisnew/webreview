const Website = require("../../model/Website");
const Review = require("../../model/Review");
const Admin = require("../../model/Admin");

const getAllWebsites = async (req, res) => {
  const websites = await Website.find({ ...req.query });
  res.status(200).json(websites);
};

const getWebsiteReviews = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);
    const reviews = await Review.find({ website: website._id });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createWebsite = async (req, res) => {
  try {
    const website = await Website.create(req.body);
    res.status(201).json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const putSpecificWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findOneAndReplace(
      { _id: websiteId },
      req.body
    );
    res.status(200).json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const patchSpecificWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findOneAndReplace(
      { _id: websiteId },
      req.body
    );
    res.status(200).json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecificWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findByIdAndDelete(websiteId);
    if (!website) {
      res
        .status(404)
        .json({ message: `Can't find Website with ObjectId ${websiteId}` });
    } else {
      return res.status(200).json(website);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllWebsites = async (req, res) => {
  try {
    const { deletedCount } = await Website.deleteMany({});
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "There are no websites to delete." });
    }
    res.status(200).json({
      message: `Deleted ${deletedCount} ${
        deletedCount === 1 ? "website" : "websites"
      }`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCreator = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      return res
        .status(404)
        .json({ message: `Can't find Website with ObjectId ${websiteId}` });
    }
    const adminId = website.createdBy;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ message: `Can't find Admin with ObjectId ${adminId}` });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSpecificWebsite = async (req, res) => {
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);
    if (website) {
      return res.status(200).json(website);
    } else {
      res
        .status(404)
        .json({ message: `Can't find Website with ObjectId ${websiteId}` });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllWebsites,
  getWebsiteReviews,
  createWebsite,
  getCreator,
  deleteAllWebsites,
  getSpecificWebsite,
  putSpecificWebsite,
  patchSpecificWebsite,
  deleteSpecificWebsite,
};
