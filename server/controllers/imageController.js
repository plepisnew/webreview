const multer = require("multer");
const path = require("path");
const Image = require("../model/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("setup destination: " + path.join(__dirname, "..", "uploads"));
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    console.log(
      "setup filename: " +
        new Date().toISOString().replace(/:/g, "-") +
        file.originalname
    );
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });

const uploadImage = async (req, res) => {
  try {
    const image = await Image.create({
      name: req.body.name,
      image: {
        data: req.file.filename,
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

module.exports = {
  uploadImage,
  upload,
};
