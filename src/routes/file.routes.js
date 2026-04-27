const express = require("express")
const router = express.Router()
const verifyTokens = require("../middleware/auth.middleware")
const fileController = require("../controllers/file.controllers")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", verifyTokens, upload.single("file"), fileController.uploadFile)
router.get("/", verifyTokens, fileController.getFiles)

module.exports = router