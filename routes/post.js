const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  toggleRetweet,
} = require("../controllers/post");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id").get(protect, getPostById);
router.route("/:id/toggleLike").put(protect, toggleLike);
router.route("/:id/toggleRetweet").post(protect, toggleRetweet);

module.exports = router;
