const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    readBy: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      //   default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
