const communityMessageModel = require("../models/communityMessageFiles.models")
const uploadfile = require("../services/storage.services")

async function uploadCommunityMessage(req, res) {
    try {
        const userId = req.user.id || req.user._id
        const username = req.user.username

        // if (!req.message) {
        //     return res.status(400).json({ message: "No message uploaded" })
        // }

        const { message } = req.body

        if (!message) {
            return res.status(400).json({ message: "message name is required" })
        }

        // const result = await uploadfile(req.file.buffer)

        const newMessage = await communityMessageModel.create({
            message:message,
            date: new Date(),
            username: username
            // ✅ null = independent file
        })

        return res.status(201).json({
            message: "Message uploaded successfully",
            file: message
        })

    } catch (error) {
        console.log("uploadMessage error:", error.message)
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

// ✅ Get all independent message (folderId = null)
async function getCommunityMessage(req, res) {
    try {
        const userId = req.user.id || req.user._id

        const messages = await communityMessageModel.find().sort({ date: -1 })  // newest first

        return res.status(200).json(messages)

    } catch (error) {
        console.log("getMessage error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { uploadCommunityMessage, getCommunityMessage }



