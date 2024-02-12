const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  permission: { type: Number, required: true }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
