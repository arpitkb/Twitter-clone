const express = require("express");
const router = express.Router({ mergeParams: true });
const { postMessage, getMessages } = require("../controllers/messages");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, postMessage);
router.route("/:chatId").get(protect, getMessages);

module.exports = router;
