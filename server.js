//starting thr server

const app = require("./src/app")  //linking the app.js with the server.js

require("dotenv").config()

app.listen(5000,()=>{
    console.log("server is running at the host 5000")
})

//.....................................................................//
//.env integration


//.....................................................................//
//linking database with the server.js

const connectDB= require("./src/DB/db")
connectDB()

//.....................................................................//


