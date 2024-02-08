const express = require("express");
const jwt = require("jsonwebtoken");


const jwtSigningSecret = "sfdjfiudfghjklkuytresx";

const AuthMiddleware = express.Router();

const autenticated = (token)=>{

    try {
        return jwt.verify(token, jwtSigningSecret)
    } catch (error) {
        return false
    }
};

AuthMiddleware.use((req, res, next)=>{

    if (autenticated(req.headers.authorization)) {
        next();
        return;
    } 
    res.status(401).json({error: "unAutorized"})
})

module.exports = {AuthMiddleware};
