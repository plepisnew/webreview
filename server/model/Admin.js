const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
      default: "Hello Earth!",
    },
    /**
     * Store reference to the Review object
     * When going to a relationship endpoint,
     */
    pendingReviews: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
