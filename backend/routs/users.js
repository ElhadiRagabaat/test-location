const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

///register
router.post("/register", async (req, res) => {

    try {
        // create new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //creat new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //save user and send response
        const user = await newUser.save()
        res.status(200).json(user._id)
    } catch (err) {
        if(err.code === "keyPattern"){
            res.status(400).json("email alreadu used")
        }
        res.status(500).json(err)
    }
})

// login
router.post("/login", async(req, res) => {
    try{
// find user
let user =  await User.findOne({username:req.body.username})
//validat userr

!user &&  res.status(400).json("Wrong userName or password")
   

//validate passs
const validPass = bcrypt.compareSync(req.body.password,user.password)
!validPass && res.status(400).json("Wrong userName or password")
    
//send res
 res.status(200).json({_id:user._id,username:user.username})
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router