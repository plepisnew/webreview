const multer = require("multer");
const path = require("path");
const Image = require("../model/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage, limits: { fieldSize: 1024 * 1024 * 3 } });

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSpecificImage = async (req, res) => {
  try {
    const image = await Image.findOne({ name: req.params.name });
    res.status(200).json(image);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const uploadImage = async (req, res) => {
  console.log(req.body);
  try {
    // const image = await Image.create({
    //   name: req.body.name,
    //   image: {
    //     data: req.file.filename,
    //     contentType: "image/png",
    //   },
    // });
    // res
    //   .status(201)
    //   .json({ message: `Successfully uploaded image ${image.name} ` });
    res.status(200).json({});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllImages,
  getSpecificImage,
  uploadImage,
  upload,
};
