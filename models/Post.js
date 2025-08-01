const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  content: String,
  uid: String,
  platform: String,
  likes: { type: Number, default: 0 },
  shared: { type: Number, default: 0 },
  comments: [String],
}, { timestamps: true });
module.exports = mongoose.model("Post", postSchema);
