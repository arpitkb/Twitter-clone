const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const randomize = require("randomatic");
const Post = require("../models/Post");

// @desc        Register a user
// @route       POST /api/auth/register
// @access      Public
module.exports.registerUser = wrapAsync(async (req, res, next) => {
  const { name, email, password, dob } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse("Email already in use", 400));
  }

  const username = email.split("@")[0] + randomize("a0", 5);

  user = await User.create({
    name,
    email,
    password,
    dob,
    username,
  });

  const token = user.getJWT();
  user.password = null;

  res.status(200).json({ user, token });
});

// @desc        Login a user
// @route       POST /api/auth/login
// @access      Public
module.exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return next(new ErrorResponse("Missing credentials", 400));
  }

  // check for user
  let user = await User.findOne({
    $or: [{ email }, { username }],
  }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const match = await user.matchPassword(password);
  if (!match) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  user.password = null;

  const token = user.getJWT();
  res.status(200).json({
    user,
    token,
  });
});

// @desc        Get loggedin user
// @route       GET /api/auth/me
// @access      Private
module.exports.getLoggedinUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

// @desc        Delete all
// @route       Delete /api/auth/all
// @access      Private
module.exports.deleteAll = wrapAsync(async (req, res, next) => {
  // await User.deleteMany();
  await Post.deleteMany();
  res.status(200).json({ msg: "Deleted all" });
});
