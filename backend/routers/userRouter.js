const express = require("express");
const {
  getUsers,
  loginUser,
  signUpUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/login", loginUser);

userRouter.post("/signup", signUpUser);

module.exports = { userRouter };
