const Post = require("../models/Post");
const User = require("../models/User");

module.exports.getPostsHelper = async (filter, page) => {
  const limit = 8;

  const total = await Post.countDocuments(filter);
  const pages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  // console.log(page, pages);
  let posts;

  if (!page) {
    posts = await Post.find(filter)
      .sort("-createdAt")
      .populate("author", "name username profilePic")
      .populate("retweetPost")
      .populate("replyTo");
  } else {
    posts = await Post.find(filter)
      .sort("-createdAt")
      .limit(limit)
      .skip(startIndex)
      .populate("author", "name username profilePic")
      .populate("retweetPost")
      .populate("replyTo");
  }

  posts = await User.populate(posts, { path: "retweetPost.author" });
  posts = await User.populate(posts, {
    path: "replyTo.author replyTo.replyTo",
  });
  posts = await User.populate(posts, { path: "replyTo.replyTo.author" });
  return posts;
};
