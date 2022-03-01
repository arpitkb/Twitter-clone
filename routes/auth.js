const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  registerUser,
  loginUser,
  getLoggedinUser,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getLoggedinUser);

module.exports = router;
