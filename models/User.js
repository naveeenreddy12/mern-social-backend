const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  name: String,
  password: String,
  platform: String,
});
module.exports = mongoose.model("User", userSchema);
