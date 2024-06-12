const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route.js");
const prisma = require("./lib/prisma.js");


app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is listening to the port 8800...");
})







































































// app.post("/api/addDepartment", async (req, res)=>{
//     try{
//         const newDept = await prisma.department.create({
//             data:{
//                 name: req.body.name
//             }
//         })

//         res.status(200).json(newDept);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add department"});
//     }
// })


// app.post("/api/addcourse/:id", async (req, res)=>{
//     const id = req.params.id;
//     const name = req.body.name;

//     try{
//         const newData = await prisma.course.create({
//             data:{
//                 deptId: id,
//                 name
//             } 
//         }) 

//         res.status(200).json(newData);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add phone number"});
//     }
// })


// app.get("/api/getDepartment",async (req, res)=>{
    
    
//     try{
//         const newDepartment = await prisma.department.findMany();

//         res.status(200).json(newDepartment);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add faculty"})
//     }
// })