const ErrorResponse = require("../utils/ErrorResponse.js");

const errorHandler = (err, req, res, next) => {
  let error = err;

  // mongoose error for wrong ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose error for duplicate
  if (err.code === 11000) {
    const message = `Duplicate field entered`;
    error = new ErrorResponse(message, 400);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((el) => el.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    msg: error.message || "Something went wrong with server",
  });
};

module.exports = errorHandler;
