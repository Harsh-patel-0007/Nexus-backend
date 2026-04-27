const mongoose= require('mongoose')

const fileSchema= new mongoose.Schema({
    file:"string",
    fileName:"string",
    date: "Date",
    fileType:"string",
    folderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Folder',
        default:null
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        
    }
})

const fileModel=mongoose.model("file",fileSchema)

module.exports=fileModel
 