const Post = require('../models/Post')
const User = require('../models/User')

module.exports.getPostsHelper = async (filter) => {
  let posts = await Post.find(filter)
    .populate("author", "name username profilePic")
    .populate("retweetPost")
    .populate("replyTo")
    .sort("-createdAt");
  posts = await User.populate(posts, { path: "retweetPost.author" });
  posts = await User.populate(posts, { path: "replyTo.author replyTo.replyTo" });
  posts = await User.populate(posts, { path: "replyTo.replyTo.author" });
  return posts;
};