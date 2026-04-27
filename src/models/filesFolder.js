const { type } = require('firebase/firestore/pipelines')
const mongoose = require('mongoose')

const fileFolderSchema= new mongoose.Schema({
    file:"string",
    fileName:"string",
    date: "Date",
    fileType:"string",
    
    folderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Folder',
        required: true
    },
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
})

const fileFolderModel=mongoose.model("file",fileFolderSchema)

module.exports=fileFolderModel
 