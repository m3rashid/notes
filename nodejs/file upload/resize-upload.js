const sharp = require('sharp');
const path = require('path')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

async function uploadFiles(file, width){
    try{
        let filePath = path.resolve(__dirname, `../uploads/resized/${file.filename}`)
        await sharp(file.path).resize({width: width}).toFile(filePath)
        let data = await cloudinary.uploader.upload(filePath)
        return data
    }
    catch(err){
        console.log(err)
    }
}