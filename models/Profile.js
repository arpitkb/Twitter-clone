const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
    maxLength: [30, "description must be less than 30 letters"],
  },
  location: {
    type: String,
    maxLength: [20, "location must be less than or equal to 20 chars"],
  },
  website: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
