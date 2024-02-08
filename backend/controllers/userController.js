const UserModel = require("../models/User")
const jwt = require("jsonwebtoken");


const jwtSigningSecret = "sfdjfiudfghjklkuytresx";

const getUsers = async (req, res)=>{

    try {
        const users = await UserModel.find();
        res.status(200).json(users)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


const loginUser = async (req, res) => {
    try {
      const user = await UserModel.findOne({
        username: req.body.username,
      });

      if (!user) {
        return res.status(404).json({error:"User does not exist"})
      }
  
      if (user.password === req.body.password) {
        const token = jwt.sign({ userId: user._id }, jwtSigningSecret);
        return res.json({ message: "login", jwtToken: token});
      }
      res.json({ error: "wrong password" });
    } catch (error) {
      res.json({ error: error.message });
    }
  };

const signUpUser = async (req, res)=>{


    try {
        const newUser = new UserModel(req.body);
        const result = await newUser.save();
        const token = jwt.sign({ userId: result._id }, jwtSigningSecret);
        return res.json({ message: "login", jwtToken: token});


    } catch (error) {
        if (error.code===11000) {
            return res.json({error: "username taken"})
        }
        res.json({error: error.message})
    }

}

module.exports = {getUsers, loginUser, signUpUser}