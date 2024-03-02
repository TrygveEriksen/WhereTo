const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { secrets } = require("../secrets");


const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json([]);
    }

    if (user.validPassword(req.body.password + secrets.jwt.pepper)) {
      const token = jwt.sign({ userId: user._id }, secrets.jwt.signingSecret);
      return res.json({ message: "login", jwtToken: token });
    }
    res.status(400).json({ error: "wrong password" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  try {
    const newUser = new UserModel();
    newUser.permission = 0;
    newUser.username = req.body.username
    newUser.setPassword(req.body.password + secrets.jwt.pepper)


    const result = await newUser.save();
    const token = jwt.sign({ userId: result._id }, secrets.jwt.signingSecret);
    return res.json({ message: "login", jwtToken: token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "username taken" });
    }
    res.status(400).json({ error: error.message });
  }
};

const toggleVisited = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json([]);
    }
    if (user.visited.includes(req.body.id)) {
      user.removeVisited(req.body.id);
      const result = await user.save();
    } else {
      user.addVisited(req.body.id);
      const result = await user.save();
    }
    return res.json({ message: "success" });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { loginUser, signUpUser, toggleVisited };
