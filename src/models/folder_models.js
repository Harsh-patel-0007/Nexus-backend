const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    folderName:"string",
    date:{
        type:Date,
        default:Date.now
    },
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        }
})

const folderModal=mongoose.model("folder",folderSchema)

module.exports=folderModal