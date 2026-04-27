const express = require("express")
const router = express.Router()
const verifyTokens = require("../middleware/auth.middleware")
const folderController = require("../controllers/folder.controllrs")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", verifyTokens, folderController.createFolder)
router.get("/", verifyTokens, folderController.getFolders)
router.post("/:folderId", verifyTokens, upload.single("file"), folderController.uploadFileInFolder)
router.get("/:folderId", verifyTokens, folderController.getFilesInFolder)

module.exports = router