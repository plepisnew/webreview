const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Image = require("../../model/Image");

const usePublicDir = false;

const UPLOAD_URL = usePublicDir
  ? path.join(__dirname, "..", "..", "..", "client", "public", "images")
  : path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_URL);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      (usePublicDir ? "" : new Date().toISOString().replace(/:/g, "-")) +
        file.originalname
    );
  },
});

const upload = multer({ storage, limits: { fieldSize: 1024 * 1024 * 3 } });

const uploadImage = async (req, res) => {
  try {
    const image = await Image.create({
      name: req.body.name,
      image: {
        data: fs.readFileSync(path.join(UPLOAD_URL, req.file.filename)),
        contentType: "image/png",
      },
    });
    res
      .status(201)
      .json({ message: `Successfully uploaded image ${image.name} ` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  const imageName = req.body.name;
  try {
    const imageExists = await Image.findOneAndReplace(
      { name: imageName },
      {
        name: req.body.name,
        image: {
          data: fs.readFileSync(path.join(UPLOAD_URL, req.file.filename)),
          contentType: "image/png",
        },
      }
    );
    if (imageExists) {
      return res.status(200).json(imageExists);
    }
    const image = await Image.create({
      name: req.body.name,
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "..", "uploads", req.file.filename)
        ),
        contentType: "image/png",
      },
    });
    res
      .status(201)
      .json({ message: `Successfully uploaded image ${image.name} ` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getImageNames = async (req, res) => {
  try {
    const images = await Image.find({});
    const imageNames = images.map((el) => el.name);
    res.status(200).json(imageNames);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSpecificImage = async (req, res) => {
  try {
    const image = await Image.findOne({ name: req.params.name });
    if (image) return res.status(200).json(image);
    res
      .status(400)
      .json({ message: `Image with name ${req.params.name} does not exist` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const clearImages = async (req, res) => {
  const { deletedCount } = await Image.deleteMany({});
  res.status(200).json({ message: `Deleted ${deletedCount} images` });
};

module.exports = {
  getAllImages,
  getImageNames,
  getSpecificImage,
  uploadImage,
  uploadProfilePicture,
  clearImages,
  upload,
};
