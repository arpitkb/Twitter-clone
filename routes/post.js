const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  toggleRetweet,
  deletePost,
} = require("../controllers/post");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id").get(protect, getPostById).delete(protect, deletePost);
router.route("/:id/toggleLike").put(protect, toggleLike);
router.route("/:id/toggleRetweet").post(protect, toggleRetweet);

module.exports = router;
