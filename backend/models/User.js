const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  permission: { type: Number, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
    return this.hash === hash;
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;