const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      //   default: [],
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", ChatSchema);
module.exports = Chat;
