const {prisma, Prisma} = require("../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res)=>{
    const {enrolmentNo, dob, name, resultDate, password} = req.body

    try{

        const student= await prisma.enrolledStudent.findUnique({
            where:{
                enrolmentNo
            }
        })

        if(!student){
            return res.status(401).json({message: `Student with enrolment no. ${enrolmentNo} doesn't exists!`});
        }
        
        if(student.name!==name || student.dob.toISOString().split('T')[0]!==dob){
            return res.status(401).json({message: "Data provided doesn't match with our database."})
        }

        const stu = await prisma.student.findUnique({
            where:{
                    enrolmentNo: enrolmentNo    
            }
        })

        if(stu){
            return res.status(400).json({message: "Student already registered!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await prisma.student.create({
            data:{
                ...req.body,
                dob: new Date(dob),
                resultDate: new Date(resultDate),
                password: hashedPassword
            }
        })

        return res.status(200).json(newStudent);

    } catch(err){

        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code==="P2002" && err.meta){
                if(err.meta.target==='Student_email_key')
                    return res.status(400).json({message: "Email is already registered!"})
                else if(err.meta.target==='Student_phoneNumber_key'){
                    return res.status(400).json({message: "Phone number is already registered"})
                }
            }
        }

        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}



const login = async (req, res)=>{
    const {enrolmentNo, password} = req.body;

    try{
        const student = await prisma.student.findUnique({
            where:{
                enrolmentNo
            }
        })

        if(!student){
            return res.status(401).json({message: "Student not registered"});
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: student.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        const age = 1000*60*60*24*7

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: age
        })

        res.status(200).json({message: "Login Successful", student})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"})
    }
}



const logout = async (req, res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({message: "Logout Successful"})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to logout"})
    }
}

module.exports = {register, login, logout};