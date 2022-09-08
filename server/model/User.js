const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
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
   
    writtenReviews: {
      type: [mongoose.SchemapTypes.ObjectId],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;