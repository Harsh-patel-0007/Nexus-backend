const mongoose = require("mongoose")
const { connect } = require("node:http2")

async function connectDB() {

    try{
        await mongoose.connect("mongodb+srv://agentra:fzXPmxLYDGaTUAlF@agentra.leezafv.mongodb.net/knovia")
        console.log("database connected")
    }
    catch (error) {
        console.error("Database connection failed ❌", error.message)
        process.exit(1) // stops the server if DB fails
    }
}

module.exports=connectDB