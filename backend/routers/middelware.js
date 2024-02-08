const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");


const jwtSigningSecret = "sfdjfiudfghjklkuytresx";

const AuthMiddleware = express.Router();

const autenticated = (token)=>{

    try {
        return jwt.verify(token, jwtSigningSecret)
    } catch (error) {
        return false
    }
};
AuthMiddleware.post("/auth", async (req, res)=>{
    const auth = autenticated(req.headers.authorization)
    if(auth){
        return res.json({auth:true})
    }
    res.json({auth:false})
})

AuthMiddleware.use( async (req, res, next)=>{
    const decoded = autenticated(req.headers.authorization)
    if (decoded) {
        const user = await UserModel.findById(decoded.userId)
        req.user = user
        next();
        return;
    } 
    res.redirect("/login")
    // res.status(401).json({error: "unAutorized"})
})

module.exports = {AuthMiddleware};
