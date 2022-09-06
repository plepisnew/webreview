const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
    isPending: {
      type: Boolean,
      required: false,
      default: true,
    },
    writtenBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    monitoredBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
