import dotenv from "dotenv";
dotenv.config();

import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath){
          console.error("No local file path provided to Cloudinary upload");
          return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        });
        //file has been uploaded
        // console.log("file has been uploaded on cloudinary", response.url)
        // console.log("response print", response)
        fs.unlinkSync(localFilePath);
        console.log("✅ File uploaded to Cloudinary:", response.secure_url); 
        return response;
    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error.message || error);
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
        return null;
    }
}
const getOptimizedUrl = (publicId, width = 1000) => {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width, crop: 'scale' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  });
};

export { uploadOnCloudinary, getOptimizedUrl };

// export {uploadOnCloudinary}