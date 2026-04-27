const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


require("dotenv").config()


async function  registerUser(req,res) {

    const {username , email ,password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        email    
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        password :hashedPassword,
        email
    })
    
    const token = jwt.sign({
        id:user._id,
        email:user.email
    }, "mysecretkey123")

    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:24*60*60*1000
    })


    res.status(201).json({
        message:"User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            // password:user.password
        }
    })

}

async function loginUser(req,res) {
    const {email, password } = req.body

    const user = await userModel.findOne({       
         email 
    })

    if(!user){
        return res.status(401).json({
            message:"Invalid Credentials",
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Credentials",
            user: {
                username: user.username,
                id: user._id,
                email: user.email,
            }
        })
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        token:token,
        user:{
            id:user._id,
            username: user.username,
            email:user.email,
        }
    })
}

module.exports = { registerUser , loginUser }

