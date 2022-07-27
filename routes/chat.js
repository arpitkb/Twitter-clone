const express = require("express");
const router = express.Router({ mergeParams: true });
const { createChat, getmyChats, getChat } = require("../controllers/chat");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createChat).get(protect, getmyChats);
router.route("/:chatId").get(protect, getChat);

module.exports = router;
