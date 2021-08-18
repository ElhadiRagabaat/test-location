const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const pinRoute = require('./routs/pins')
const userRoute = require('./routs/users')
const multer = require("multer")

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true ,useUnifiedTopology:true}).then(() => {
    console.log("MongoDB conectted")
}).catch((err) => {
    console.log(err)
});

////  image storage
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"images")
//     },filename:(req,file,cb)=>{
//         cb(null,req.body.name)
//     }
// })

// const upload = multer({storage:storage});
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("file has been uploaded")
// })

app.use("/api/pins",pinRoute)
app.use("/api/users", userRoute)

app.listen(8800, () => {
    console.log("backEnd is runing!!!")
})