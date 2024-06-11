const prisma = require("../lib/prisma.js");

const register = async (req, res)=>{
    
    
    try{

        const newAdmin = await prisma.admin.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phonenumber,
                department: req.body.department,
                position: req.body.position,
                password: req.body.password
            }
        });

        res.status(200).json(newAdmin);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to register"})
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