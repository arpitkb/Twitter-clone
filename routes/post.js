const express = require("express");
const router = express.Router({ mergeParams: true });
const { createPost, getPosts, getPostById } = require("../controllers/post");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createPost);
router.route("/").get(protect, getPosts);
router.route("/:id").get(protect, getPostById);

module.exports = router;
