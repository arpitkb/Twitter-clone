const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getUser,
  toggleFollow,
  getUserLikedPosts,
  getUserPosts,
  getUsersByKeyword
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.route("/:username").get(protect, getUser);
router.route("/").get(protect, getUsersByKeyword);
router.route("/:id/toggleFollow").put(protect, toggleFollow);

router.route("/:username/posts").get(protect, getUserPosts);
router.route("/:username/posts/liked").get(protect, getUserLikedPosts);

module.exports = router;
