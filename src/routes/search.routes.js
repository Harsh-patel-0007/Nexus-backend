const express = require("express")
const router = express.Router()
const verifyTokens = require("../middleware/auth.middleware")
const searchController = require("../controllers/search.controllers")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.get("/search",searchController.search)

module.exports=router

