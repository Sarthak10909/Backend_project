import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uploading the file on the cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded successfully
    console.log("the file has been uplaoded on the cloudinary ", response.url);
    fs.unlinkSync(localFilePath);   
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);          //remove the locally saved temporary file as the uplaod peration got failed.
    return null;
  }
};

export {uploadOnCloudinary};
