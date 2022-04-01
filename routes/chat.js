const express = require("express");
const router = express.Router({ mergeParams: true });
const { createChat, getmyChats } = require("../controllers/chat");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createChat).get(protect, getmyChats);

module.exports = router;
