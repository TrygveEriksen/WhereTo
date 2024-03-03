const express = require("express");
const {
  loginUser,
  signUpUser,
} = require("../controllers/entryController");

const entryRouter = express.Router();

entryRouter.post("/login", loginUser);

entryRouter.post("/signup", signUpUser);

module.exports = { entryRouter };
