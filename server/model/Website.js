const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoSrc: {
      type: String,
      default: "images/default_website_icon.png",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    url: {
      type: String,
      required: false, // TODO: remove if test fails
      unique: true,
    },
    launchDate: {
      type: Date,
      required: false,
      default: () => Date.now(),
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Website = mongoose.model("Website", websiteSchema);
module.exports = Website;
