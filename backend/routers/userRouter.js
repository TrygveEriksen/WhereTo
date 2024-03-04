const express = require("express");
const {
  toggleVisited,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.put("/togglevisited", toggleVisited);

module.exports = { userRouter };
