const User = require("../models/User");
const Profile = require("../models/Profile");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const Post = require("../models/Post");

// @desc        Create a post
// @route       POST /api/post
// @access      Private
module.exports.createPost = wrapAsync(async (req, res, next) => {
  const { content, images } = req.body;
  const post = await Post.create({
    content,
    images,
    author: req.user,
  });
  res.status(201).json(post);
});

// @desc        Get all posts
// @route       GET /api/post
// @access      Private
module.exports.getPosts = wrapAsync(async (req, res, next) => {
  const posts = await Post.find().populate("author").sort("-createdAt");
  res.status(200).json(posts);
});

// @desc        Get Single Post by id
// @route       GET /api/post/:id
// @access      Private
module.exports.getPostById = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author");
  res.status(200).json(post);
});
