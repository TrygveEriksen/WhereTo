const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const { secrets } = require("../secrets");

const AuthMiddleware = express.Router();

AuthMiddleware.get("/auth", async (req, res) => {
  const decoded = autenticated(req.headers.authorization);
  if (!decoded) {
    return res.json({ auth: false });
  }
  return res.json({ auth: true });
});

AuthMiddleware.use(async (req, res, next) => {
  const decoded = autenticated(req.headers.authorization);
  if (!decoded) {
    //redirect to login if not authorized
    return res.json({redirect:true})
  }else{
    const user = await UserModel.findById(decoded.userId);
    req.user = user;
    next();

  }

});

const autenticated = (token) => {
  try {
    return jwt.verify(token, secrets.jwt.signingSecret);
  } catch (error) {
    return null;
  }
};
module.exports = { AuthMiddleware };
