const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const Post = require("../models/Post");
const { getPostsHelper } = require("../utils/functions");

// @desc        GET a user
// @route       GET /api/user/:username
// @access      Private
module.exports.getUser = wrapAsync(async (req, res, next) => {
  const { username } = req.params;
  let user = await User.findOne({ username });
  if (!user) {
    return next(new ErrorResponse("This account doesn't exist", 404));
  }
  res.status(200).json(user);
});

// @desc        Follow/Unfollow a user
// @route       PUT /api/user/:id/toggleFollow
// @access      Private
module.exports.toggleFollow = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("This user doesn't exist", 404));
  }

  if (user._id.toString() === req.user.toString()) {
    return next(new ErrorResponse("Cannot perform this action", 404));
  }
  let doIFollow = false;

  // console.log(req.user._id);
  doIFollow =
    req.user.following.filter((el) => {
      return el.toString() === id.toString();
    }).length !== 0;

  console.log(doIFollow);

  if (doIFollow) {
    await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
  } else {
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: req.user._id },
    });
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { following: id },
    });
  }

  res.status(201).json({ msg: "success" });
});

// @desc        Get all posts of a user
// @route       GET /api/user/:username/posts
// @access      Private
module.exports.getUserPosts = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username });
  let posts = await getPostsHelper({ author: user._id, replyTo: null });

  posts = await User.populate(posts, { path: "retweetPost.author" });
  res.status(200).json(posts);
});

// @desc        Get all posts that a user has liked
// @route       GET /api/user/:username/posts/liked
// @access      Private
module.exports.getUserLikedPosts = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return next(new ErrorResponse("User not found", 404));
  let posts = await getPostsHelper({ _id: { $in: user.likes } });
  res.status(200).json(posts);
});

// @desc        Get all posts that a user has replied to
// @route       GET /api/user/:username/posts/reply
// @access      Private
module.exports.getUserRepliedPosts = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return next(new ErrorResponse("User not found", 404));

  let posts = await getPostsHelper({
    author: user._id,
    replyTo: { $exists: true },
  });
  res.status(200).json(posts);
});

// @desc        Get all users by keyword
// @route       GET /api/user
// @access      Private
module.exports.getUsersByKeyword = wrapAsync(async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(200).json([]);
  }
  let qry = {
    $or: [
      { username: new RegExp(keyword, "i") },
      { name: new RegExp(keyword, "i") },
    ],
  };
  let users = await User.find(qry);

  res.status(200).json(users);
});

// @desc        Get all user's followers
// @route       GET /api/user/:username/followers
// @access      Private
module.exports.getUserFollowers = wrapAsync(async (req, res, next) => {
  const { username } = req.params;

  let user = await User.findOne({ username: req.params.username });
  if (!user) return next(new ErrorResponse("User not found", 404));

  let followers = await User.find({ _id: { $in: user.followers } }).select(
    "username name"
  );
  res.status(200).json(followers);
});

// @desc        Get all user's following
// @route       GET /api/user/:username/following
// @access      Private
module.exports.getUserFollowings = wrapAsync(async (req, res, next) => {
  const { username } = req.params;

  let user = await User.findOne({ username: req.params.username });
  if (!user) return next(new ErrorResponse("User not found", 404));

  let followings = await User.find({ _id: { $in: user.following } }).select(
    "username name"
  );
  res.status(200).json(followings);
});
