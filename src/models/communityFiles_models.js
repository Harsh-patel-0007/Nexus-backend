const mongoose= require('mongoose')

const CommunityFileSchema= new mongoose.Schema({
    file:"string",
    fileName:"string",
    date: "Date",
    fileType:"string",
    // folderId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Folder',
    //     default:null
    // },
    username:{
        type:mongoose.Schema.Types.String,
        ref:'user'
        
    }
})

const communityfileModel=mongoose.model("Communityfile",CommunityFileSchema)

module.exports=communityfileModel