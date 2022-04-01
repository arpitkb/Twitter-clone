const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length < 5;
        },
        message: () => `Cannot post more than 4 images`,
      },
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    retweetUsers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    retweetPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    numComments: {
      type: Number,
      default: 0,
    },
    // replies: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    //   default: [],
    // }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
