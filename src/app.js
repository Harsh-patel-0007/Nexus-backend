const express = require("express")

require("dotenv").config()

const authRoutes = require("./routes/auth.routes")

const multer = require("multer")

const cors = require('cors');

const cookieParser = require("cookie-parser")

const app = express()

const verifyTokens= require("./middleware/auth.middleware")

// ✅ Allow your frontend origin
app.use(cors({
    origin: 'https://nexus-repo-ten.vercel.app/',  // ← your frontend port (Live Server default)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}));

// app.options('*', cors())
app.use(express.json())
app.use(cookieParser())

//linking the file_models.js with the app.js
const fileModel = require("./models/files_model")
const uploadfile = require("./services/storage.services")

//linking folder_models.js
const folderModal = require("./models/folder_models")
const upload = multer({ storage: multer.memoryStorage() })

//linking communityFiles_models.js
const communityfilemodel = require("./models/communityFiles_models")
// const upload = multer({ storage: multer.memoryStorage() })


//middelware


//api key registered for folder
const folderRoutes = require("./routes/folder.routes")

//api key for files
const fileRoutes = require("./routes/file.routes")

//api key for search
const searchRoutes = require("./routes/search.routes")

//api key for community files
const communityRoutes = require("./routes/communityFiles.routes")

//api key for communitymessage
const communityMessageRoutes = require("./routes/communitymessage.routes")


//api key for resitered user
app.use("/api/auth", authRoutes)

app.use("/api/folder", folderRoutes)

app.use("/api/files",fileRoutes)

app.use("/api",searchRoutes)

app.use("/api/community-message", communityMessageRoutes)

app.use("/api/community-uploads",communityRoutes)

module.exports = app














//...................................................................................................//
// post api -->upload independently
// app.post("/api/file",verifyTokens, upload.single("file"), async (req, res) => {
//     try {
//         const result = await uploadfile(req.file.buffer)

//         const file = await fileModel.create({
//             file: result.url,
//             fileName: req.body.fileName,
//             date: Date.now(),// ← ISTS//come from the backend
//             folderId:null,
//             userId:req.user.id
//         })

//         return res.status(201).json({
//             message: "successfull",
//             file: file
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             message: "something went wrong",
//             error: error.message
//         })
//     }

// })

// //.................................................................................................//
// // GET all files from MongoDB uploaded independently
// app.get('/api/files', verifyTokens, async (req, res) => {
//     try {
//         const files = await fileModel.find({ folderId: null }, { userId: req.user.id }).sort({ date: -1 }); // newest first//....................//
//         console.log("Files found:", files.length)
//         res.json(files);
//     } catch (err) {
//         console.error('GET /api/files error:', error.message);
//         res.status(500).json({ message: error.message });
//     }
// });

// //...........................................................................................//
// // GET /api/folder — Get all folders
// app.get("/api/folder", verifyTokens, async (req, res) => {
//     try {
//         const folders = await folderModal.find({ userId: req.user.id }).sort({ createdAt: -1 });

//         return res.status(200).json({
//             message: "Folders fetched successfully",
//             data: folders,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: error.message,
//         });
//     }
// });

// //...............................................................................................//
// // POST /api/folder — post all folders
// app.post("/api/folder", verifyTokens, async (req, res) => {
//     try {

//         const {folderName} = req.body
//         const userId = req.user.id

//         const folder = await folderModal.create({
//             folderName :folderName,
//             date:new Date,// ← ISTS//come from the backend
//             userId:userId
//         })

//         return res.status(201).json({
//             message: "successfull",
//             data: folder
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             message: "something went wrong",
//             error: error.message
//         })
//     }

// })

// //................................................................................//
// // upload inside folder
// app.post("/api/upload/:folderId", verifyTokens, upload.single("file"), async (req, res) => {
//     try {
//         const { folderId } = req.params

//         const result = await uploadfile(req.file.buffer)

//         const savedFile = await fileModel.create({
//             file: result.url,
//             fileName:req.body.fileName,
//             date: Date.now(),
//             folderId: folderId,
//             userId: req.user.id
//         })

//         return res.status(201).json({
//             message: "successfull",
//             file: savedFile
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             message: "something went wrong",
//             error: error.message
//         })
//     }
// })

// //..............................................................................................//
// // getfiles inside specific folders 
// app.get("/api/files/:folderId",verifyTokens, async (req , res)=>{
//     try{
//         const files = await fileModel

//             .find({ folderId: req.params.folderId }, { userId: req.user.id })
//         .sort({date:-1})

//         res.json(files)
//     }catch(error){
//         res.status(500).json({
//             message:error.message
//         })
//     }
// })

// module.exports = app