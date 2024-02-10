const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const jwtSigningSecret = "sfdjfiudfghjklkuytresx";

const AuthMiddleware = express.Router();

const autenticated = (token) => {
  try {
    return jwt.verify(token, jwtSigningSecret);
  } catch (error) {
    return null;
  }
};

AuthMiddleware.get("/auth", async (req, res) => {
  const decoded = autenticated(req.headers.authorization);
if(!decoded){
    return res.json({ auth: false });
}
return res.json({ auth: true });
});

AuthMiddleware.use(async (req, res, next) => {
  const decoded = autenticated(req.headers.authorization);
  if (!decoded) {
    return res.redirect("/login");
  }

  const user = await UserModel.findById(decoded.userId);
  req.user = user;
  next();
});

module.exports = { AuthMiddleware };
