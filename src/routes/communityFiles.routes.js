const express = require("express")
const router = express.Router()
const verifyTokens = require("../middleware/auth.middleware")
const communityfileController = require("../controllers/communityFile.controllers")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", verifyTokens, upload.single("file"), communityfileController.uploadCommunityFile)

router.get("/", verifyTokens, communityfileController.getCommunityFiles)

module.exports = router