const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      //   select: false,
      required: [true, "Password is required"],
      select: false,
      //   match: [
      //     /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
      //     "Password must be between 7 to 15 characters which contain at least one numeric digit and a special character",
      //   ],
    },
    dob: {
      type: Date,
      required: [true, "D.O.B is required"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
      default: [],
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
      default:
        "https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*",
    },
    coverPic: {
      type: String,
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    retweets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// get json web token
userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
