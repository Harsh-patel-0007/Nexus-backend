const express = require("express")
const router = express.Router()
const verifyTokens = require("../middleware/auth.middleware")
const communityMessageController = require("../controllers/communityMessage.controllers")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", verifyTokens, communityMessageController.uploadCommunityMessage)

router.get("/", verifyTokens, communityMessageController.getCommunityMessage)

module.exports = router