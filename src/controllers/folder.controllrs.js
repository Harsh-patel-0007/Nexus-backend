const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const folderModel = require("../models/folder_models")
const fileModel = require("../models/files_model")
const uploadfile = require("../services/storage.services")

// ✅ Create a new folder
async function createFolder(req, res) {
    try {
        console.log("req.body:",req.body)
        console.log("req.user:",req.user)

        const { folderName } = req.body
        const userId = req.user.id || req.user._id

        if (!folderName) {
            return res.status(400).json({ message: "Folder name is required" })
        }

        const folder = await folderModel.create({
            folderName: folderName,
            date: Date.now(),
            userId: userId
        })

        return res.status(201).json({
            message: "Folder created successfully",
            folder: folder
        })

    } catch (error) {
        console.log("createFolder error:", error.message)
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

// ✅ Get all folders for logged in user
async function getFolders(req, res) {
    try {
        const userId = req.user.id||req.user._id

        const folders = await folderModel.find({ userId: userId })

        return res.status(200).json(folders)

    } catch (error) {
        console.log("getFolders error:", error.message)
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

// ✅ Upload file inside a folder
async function uploadFileInFolder(req, res) {
    try {
        const userId = req.user.id
        const { folderId } = req.params
        const { fileName } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        if (!fileName) {
            return res.status(400).json({ message: "File name is required" })
        }

        // verify folder belongs to this user
        const folder = await folderModel.findOne({
            _id: folderId,
            userId: userId
        })

        if (!folder) {
            return res.status(404).json({ message: "Folder not found" })
        }

        // upload to imagekit
        const result = await uploadfile(req.file.buffer)

        const file = await fileModel.create({
            file: result.url,
            fileName: fileName,
            fileType: req.file.mimetype,
            date: Date.now(),
            folderId: folderId,
            userId: userId
        })

        return res.status(201).json({
            message: "File uploaded successfully",
            file: file
        })

    } catch (error) {
        console.log("uploadFileInFolder error:", error.message)
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

// ✅ Get all files inside a folder
async function getFilesInFolder(req, res) {
    try {
        const userId = req.user.id
        const { folderId } = req.params

        // verify folder belongs to this user
        const folder = await folderModel.findOne({
            _id: folderId,
            userId: userId
        })

        if (!folder) {
            return res.status(404).json({ message: "Folder not found" })
        }

        const files = await fileModel.find({
            folderId: folderId,
            userId: userId
        })

        return res.status(200).json(files)

    } catch (error) {
        console.log("getFilesInFolder error:", error.message)
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { createFolder, getFolders, uploadFileInFolder, getFilesInFolder }
    
