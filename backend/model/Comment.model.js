const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true }, // Event or Formation ID
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
