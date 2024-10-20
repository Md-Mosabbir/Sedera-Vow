import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // eslint-disable-next-line no-undef
  api_key: process.env.CLOUDINARY_API_KEY,
  // eslint-disable-next-line no-undef
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    const uploadedImage = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })
    // file uploaded successfully
    console.log("File uploaded successfully", uploadedImage.url)

    return uploadedImage
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    fs.unlinkSync(localFilePath) // delete the file
    return null
  }
}

export { uploadOnCloudinary }
