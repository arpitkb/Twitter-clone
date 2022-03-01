const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please add some content"],
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
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
