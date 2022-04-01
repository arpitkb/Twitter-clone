// const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const randomize = require("randomatic");
const Chat = require("../models/Chat");

// @desc        Create a chat
// @route       POST /api/chat
// @access      Private
module.exports.createChat = wrapAsync(async (req, res, next) => {
  const { users, chatName } = req.body;

  if (!users || users.length === 0) {
    return next(new ErrorResponse("Please add some users", 400));
  }

  let allUsers = [req.user, ...users];

  const result = await Chat.create({
    users: allUsers,
    isGroupChat: true,
    chatName,
  });

  res.status(201).json(result);
});

// @desc        Get all user's chats
// @route       GET /api/chat
// @access      Private
module.exports.getmyChats = wrapAsync(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  }).sort("-createdAt");

  res.status(200).json(chats);
});
