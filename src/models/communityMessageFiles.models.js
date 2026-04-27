const mongoose= require('mongoose')

const CommunityMessageSchema= new mongoose.Schema({
    message:"string",
    date: "Date",
    username:{
        type:mongoose.Schema.Types.String,
        ref:'user'
        
    }
})

const communityMessageModel=mongoose.model("Communitymessage",CommunityMessageSchema)

module.exports=communityMessageModel