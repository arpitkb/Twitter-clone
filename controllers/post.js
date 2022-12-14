const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const Post = require("../models/Post");
const { getPostsHelper } = require("../utils/functions");
const Notification = require("../models/Notification");

// @desc        Create a post
// @route       POST /api/post
// @access      Private
module.exports.createPost = wrapAsync(async (req, res, next) => {
  const { content, images, replyTo } = req.body;

  let postData = { content, images, author: req.user };

  if (replyTo) {
    postData.replyTo = replyTo;
    await Post.findByIdAndUpdate(replyTo, { $inc: { numComments: 1 } });
  }

  // create new post with given post data
  let post = await Post.create(postData);
  post = await getPostsHelper({ _id: post._id });
  post = post[0];
  if (replyTo) {
    await Notification.addNotification(
      replyTo,
      req.user._id,
      "reply",
      post._id
    );
  }

  res.status(201).json(post);
});

// @desc        Delete a post
// @route       DELETE /api/post/:id
// @access      Private and only owner
module.exports.deletePost = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  let post = await Post.findById(id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  if (post.author.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("Unauthorized to perform this action", 401));
  }

  if (post.replyTo) {
    await Post.findByIdAndUpdate(post.replyTo, { $inc: { numComments: -1 } });
  }

  post = await Post.findByIdAndDelete(id);

  res.status(202).json(post);
});

// @desc        Get all posts for the feed (only from those that are present in user's following list)
// @route       GET /api/post
// @access      Private
module.exports.getPosts = wrapAsync(async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;

  let posts = await getPostsHelper(
    {
      $or: [{ author: req.user._id }, { author: { $in: req.user.following } }],
    },
    page
  );
  res.status(200).json(posts);
});

// @desc        Get Single Post by id
// @route       GET /api/post/:id
// @access      Private
module.exports.getPostById = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  let post = await getPostsHelper({ _id: id });
  if (post.length === 0) {
    return next(new ErrorResponse("Resource not found"));
  }
  post = post[0];

  let result = { post };
  if (post.replyTo) {
    result.replyTo = post.replyTo;
  }
  result.replies = await getPostsHelper({ replyTo: id });
  res.status(200).json(result);
});

// @desc        like/unlike a post
// @route       GET /api/post/:id/toggleLike
// @access      Private
module.exports.toggleLike = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  let post = await Post.findById(id);
  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }
  let isLiked = false;

  // console.log(req.user._id);
  isLiked =
    req.user.likes.filter((el) => {
      return el.toString() === id.toString();
    }).length !== 0;

  if (isLiked) {
    post = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user._id, { $pull: { likes: id } });
  } else {
    post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { likes: id } });
  }

  if (!isLiked) {
    await Notification.addNotification(post.author, req.user._id, "like", id);
  }
  res.status(201).json(post);
});

// @desc        retweet / unretweet a post
// @route       POST /api/post/:id/toggleRetweet
// @access      Private
// module.exports.toggleRetweet = wrapAsync(async (req, res, next) => {
//   const { id } = req.params;

//   let post = await Post.findById(id);
//   if (!post) {
//     return next(new ErrorResponse("Post not found", 404));
//   }
//   if (post.author.toString() === req.user._id.toString())
//     return next(new ErrorResponse("You cannot retweet your own tweets", 400));

//   let isRetweeted = req.user.retweets.includes(id);

//   if (isRetweeted) {
//     post = await Post.findByIdAndUpdate(
//       id,
//       { $pull: { retweets: { user: req.user._id } } },
//       { new: true }
//     );
//     await User.findByIdAndUpdate(req.user._id, {
//       $pull: { retweets: id },
//     });
//   } else {
//     post = await Post.findByIdAndUpdate(
//       id,
//       { $addToSet: { retweets: { user: req.user._id } } },
//       { new: true }
//     );
//     await User.findByIdAndUpdate(req.user._id, {
//       $addToSet: { retweets: id },
//     });
//   }
//   res.status(201).json(post);
// });

module.exports.toggleRetweet = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  let old = await Post.findById(id);
  if (old.author.toString() === req.user._id.toString())
    return next(new ErrorResponse("You cannot retweet your own tweets", 400));

  let deletedPost = await Post.findOneAndDelete({
    author: req.user._id,
    retweetPost: id,
  });

  let isRetweeted = deletedPost !== null;

  if (!deletedPost) {
    deletedPost = await Post.create({
      retweetPost: id,
      author: req.user._id,
    });
  }
  let post;

  if (isRetweeted) {
    post = await Post.findByIdAndUpdate(
      id,
      { $pull: { retweetUsers: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { retweets: id },
    });
  } else {
    post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { retweetUsers: req.user._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { retweets: id },
    });
  }

  if (!isRetweeted) {
    await Notification.addNotification(
      post.author,
      req.user._id,
      "retweet",
      id
    );
  }
  res.status(201).json(post);
});
