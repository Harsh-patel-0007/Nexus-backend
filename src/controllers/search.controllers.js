const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const folderModel = require("../models/folder_models")
const fileModel = require("../models/files_model")
const uploadfile = require("../services/storage.services")

async function search(req,res){
    try{
        console.log("request.params.key:",req.params.key)

        const key = req.query.key

        const search= await fileModel.find({
            fileName: { $regex: key, $options: "i" } 
        }) 

        return res.status(200).json(search)
    }

    catch(error){
        console.log("search error:",error.message)
        return res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
}
 
module.exports={search}