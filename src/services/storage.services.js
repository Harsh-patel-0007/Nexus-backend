const ImageKit = require("@imagekit/nodejs")

const { base } = require("../models/files_model")

const imagekit = new ImageKit({

    privateKey:"private_Pza+5uEOFRocdIVtkP6uVvAfBQE="
})

async function uploadfile(buffer){

    const result = await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:"image.jpg",
        date:"Date"
    })

    return result
}

module.exports=uploadfile