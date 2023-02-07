const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "destinations" },
  text: { type: String, required: true },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("comments", comments);
