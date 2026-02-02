import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const imageUploader = async (filePath) => {
    if (!filePath) {
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return response.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log(error);
    }
}

export default imageUploader;