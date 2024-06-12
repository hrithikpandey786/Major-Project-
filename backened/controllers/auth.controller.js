const prisma = require("../lib/prisma.js");

const register = async (req, res)=>{
    try{

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to register"});
    }
}

const login = async (req, res)=>{
    try{

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"})
    }
}

const logout = async (req, res)=>{
    try{

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to logout"})
    }
}

module.exports = {register, login, logout};