const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const randomize = require("randomatic");
const Chat = require("../models/Chat");
const User = require("../models/User");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

// @desc        Post a messgage
// @route       POST /api/message
// @access      Private
module.exports.postMessage = wrapAsync(async (req, res, next) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return next(
      new ErrorResponse("Insufficient data to send the message", 400)
    );
  }

  let message = await Message.create({
    content,
    chat: chatId,
    sender: req.user._id,
  });

  let chat = await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message._id,
  });

  message = await message.populate("sender", "name username");
  message = await message.populate("chat");

  chat.users.forEach(async (el) => {
    if (el.toString() === message.sender._id.toString()) return;
    await Notification.addNotification(
      el,
      req.user._id,
      "message",
      message.sender._id
    );
  });

  res.status(200).json(message);
});

// @desc        Get all messages of a chat
// @route       POST /api/message/:chatId
// @access      Private
module.exports.getMessages = wrapAsync(async (req, res, next) => {
  const { chatId } = req.params;

  let chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: req.user._id } },
  });

  if (!chat) {
    return next(new ErrorResponse("Chat not accessible", 400));
  }

  let messages = await Message.find({ chat: chatId }).populate(
    "sender",
    "username name"
  );

  // messages = await messages.populate("chat");

  res.status(200).json(messages);
});
