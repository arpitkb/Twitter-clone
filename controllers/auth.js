const User = require("../models/User");
const Profile = require("../models/Profile");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const randomize = require("randomatic");

// @desc        Register a user
// @route       POST /api/auth/register
// @access      Public
module.exports.registerUser = wrapAsync(async (req, res, next) => {
  const { name, email, password, dob } = req.body;
  let newuser = await User.findOne({ email });
  if (newuser) {
    return next(new ErrorResponse("Email already in use", 400));
  }

  const username = email.split("@")[0] + randomize("a0", 5);

  newuser = await User.create({
    name,
    email,
    password,
    dob,
    username,
  });

  await Profile.create({
    user: newuser.id,
  });

  const token = newuser.getJWT();
  newuser.password = null;

  res.status(200).json({ user: newuser, token });
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
