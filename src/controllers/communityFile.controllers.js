const communityfileModel = require("../models/communityFiles_models")
const uploadfile = require("../services/storage.services")


// ✅ Upload file in community
async function uploadCommunityFile(req, res) {
    try {
        const userId = req.user.id || req.user._id
        const username = req.user.username

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const { fileName } = req.body
        if (!fileName) {
            return res.status(400).json({ message: "File name is required" })
        }

        const result = await uploadfile(req.file.buffer)

        const file = await communityfileModel.create({
            file: result.url,
            fileName: fileName,
            fileType: req.file.mimetype,
            date: new Date(),
            username:username
                 // ✅ null = independent file
        })

        return res.status(201).json({
            message: "File uploaded successfully",
            file: file
        })

    } catch (error) {
        console.log("uploadFile error:", error.message)
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

// ✅ Get all independent files (folderId = null)
async function getCommunityFiles(req, res) {
    try {
        const userId = req.user.id || req.user._id

        const files = await communityfileModel.find().sort({ date: -1 })  // newest first

        return res.status(200).json(files)

    } catch (error) {
        console.log("getFiles error:", error.message)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { uploadCommunityFile, getCommunityFiles }