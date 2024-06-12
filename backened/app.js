const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route.js");
const prisma = require("./lib/prisma.js");

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is listening to the port 8800...");
})



































































// app.get("/api/getDepartment",async (req, res)=>{
    
    
//     try{
//         const newDepartment = await prisma.department.findMany();

//         res.status(200).json(newDepartment);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add faculty"})
//     }
// })



// app.post("/api/addphonenumber/:id", async (req, res)=>{
//     const id = req.params.id;
//     const number = req.body.number;

//     try{
//         const newData = await prisma.phoneNumber.create({
//             data:{
//                 departmentId: id,
//                 number: number
//             } 
//         }) 

//         res.status(200).json(newData);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add phone number"});
//     }
// })