const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureSrc: {
      type: String,
      required: false,
      default: "images/default_user_icon.png",
    },
    description: {
      type: String,
      required: false,
      default: "Hello Moon!",
    },
    disabledFor: {
      type: Number,
      required: false,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    writtenReviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
