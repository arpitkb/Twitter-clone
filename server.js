const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./utils/db.js");
const ErrorResponse = require("./utils/ErrorResponse");
const errorHandler = require("./middlewares/error");

const cookieParser = require("cookie-parser");

//importing routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

// security middlewares
// import mongoSanitize from "express-mongo-sanitize";
// import helmet from "helmet";
// import xssClean from "xss-clean";
// import rateLimit from "express-rate-limit";
// import hpp from "hpp";

const app = express();

// connect to database
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload());

// Sanitize data
// app.use(mongoSanitize());

// Set security headers
// app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacks
// app.use(xssClean());

// add hpp
// app.use(hpp());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 50,
// });
// app.use(limiter);

// all routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  const id = 5;
  res.send(id);
});

//serve static assets in production
// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// 404 handling
app.use((req, res, next) => {
  return next(new ErrorResponse("Page not found", 404));
});

// error handling middleware
app.use(errorHandler);

// listen to server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
