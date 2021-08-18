 const router = require("express").Router()
 const Pin = require("../models/Pins")
const multer = require("multer")

 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../frontend/public/upload")
    },filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("file has been uploaded")
// })

 //cerat pins
 router.post("/",upload.single("imageUrl") ,async (req,res)=>{
     const newPin = new Pin({
         title:req.body.title,
         desc:req.body.desc,
         username:req.body.username,
         rating:req.body.rating,
         lat:req.body.lat,
         long:req.body.long,
         imageUrl:req.file.originalname
     })

     try{

        const savedPin = await newPin.save()
        res.status(200).json(savedPin)

     }catch(err){
         res.status(500).json(err)
     }
    
 })
/// get all pins

router.get("/", async (req,res)=>{
try{
    const pins =  await Pin.find()
    res.status(200).json(pins)

}catch(err){
    res.status(500).json(err)
}
})


module.exports = router
  