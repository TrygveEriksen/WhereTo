const express = require("express");
const {
  loginUser,
  signUpUser,
  toggleVisited,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/signup", signUpUser);

userRouter.put("/togglevisited", toggleVisited);

module.exports = { userRouter };
