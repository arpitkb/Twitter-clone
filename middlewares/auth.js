const ErrorResponse = require("../utils/ErrorResponse.js");

const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.protect = wrapAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies._token) {
    token = req.cookies._token;
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});
