const jwt = require("jsonwebtoken")

function verifyTokens(req,res,next){

    
    console.log("cookies received", req.cookies),
    console.log("token:",req.cookies.token)
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Not authenticated"})
    
        
    }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded
            console.log("decoded user:",decoded)
            next()
        }catch(error){
            return res.status(401).json({message:"invalid Token"})
        }
    
}

module.exports = verifyTokens