// const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const randomize = require("randomatic");
const Chat = require("../models/Chat");
const User = require("../models/User");
const mongoose = require("mongoose");

// @desc        Create a chat
// @route       POST /api/chat
// @access      Private
module.exports.createChat = wrapAsync(async (req, res, next) => {
  const { users } = req.body;

  if (!users || users.length === 0) {
    return next(new ErrorResponse("Please add some users", 400));
  }

  let allUsers = [req.user, ...users];

  let chat = await Chat.findOne({
    $and: [
      { users: { $all: allUsers } },
      { users: { $size: allUsers.length } },
    ],
  });

  if (!chat) {
    chat = await Chat.create({
      users: allUsers,
      isGroupChat: allUsers.length > 2 ? true : false,
    });
  }

  // chat = await User.populate(chat, { path: "users" });
  chat = await chat.populate("users", "name username");
  chat = await chat.populate({
    path: "latestMessage",
    populate: {
      path: "sender",
      select: "name username",
    },
  });

  res.status(201).json(chat);
});

// @desc        Get all user's chats
// @route       GET /api/chat
// @access      Private
module.exports.getmyChats = wrapAsync(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "name username")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name username",
      },
    })
    .sort("-updatedAt");
  // chats = await User.populate(chats, {
  //   path: "latestMessage.sender",
  // });

  res.status(200).json(chats);
});

// @desc        Get a chat by chat ID or UserID
// @route       GET /api/chat/:chatId
// @access      Private
module.exports.getChat = wrapAsync(async (req, res, next) => {
  const { chatId } = req.params;
  let chat = await Chat.findById(chatId);

  if (!chat) {
    // Check if user exists

    let user = User.findById(chatId);

    if (!user) {
      chat = await Chat.findOneAndUpdate(
        {
          isGroupChat: false,
          users: {
            $size: 2,
            $all: [
              { $elemMatch: { $eq: mongoose.Types.ObjectId(chatId) } },
              { $elemMatch: { $eq: mongoose.Types.ObjectId(req.user._id) } },
            ],
          },
        },
        {
          $setOnInsert: {
            users: [chatId, req.user._id],
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    }
  }

  if (!chat || !chat.users.includes(req.user._id)) {
    return next(new ErrorResponse("Chat not found", 404));
  }

  // chat = await User.populate(chat, { path: "users" });
  chat = await chat.populate("users", "name username");

  res.status(200).json(chat);
});
