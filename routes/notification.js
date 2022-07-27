const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotifs, createNotif } = require("../controllers/notification");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, createNotif).get(protect, getNotifs);

module.exports = router;
