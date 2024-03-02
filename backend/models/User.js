const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  permission: { type: Number, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  visited: { type: [], required: false, default: [] },
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

UserSchema.methods.addVisited = function (id) {
  if (!this.visited.includes(id)) {
    this.visited.push(id);
  }
};
UserSchema.methods.removeVisited = function (id) {
  if (this.visited.includes(id)) {
    this.visited = this.visited.filter((visited) => visited !== id);
  }
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
