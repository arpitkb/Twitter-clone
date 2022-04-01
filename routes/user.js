const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getUser,
  toggleFollow,
  getUserLikedPosts,
  getUserPosts,
  getUsersByKeyword,
  getUserRepliedPosts,
  getUserFollowers,
  getUserFollowings,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.route("/:username").get(protect, getUser);
router.route("/").get(protect, getUsersByKeyword);
router.route("/:id/toggleFollow").put(protect, toggleFollow);

router.route("/:username/posts").get(protect, getUserPosts);
router.route("/:username/posts/liked").get(protect, getUserLikedPosts);
router.route("/:username/posts/reply").get(protect, getUserRepliedPosts);
router.route("/:username/followers").get(protect, getUserFollowers);
router.route("/:username/following").get(protect, getUserFollowings);

module.exports = router;
