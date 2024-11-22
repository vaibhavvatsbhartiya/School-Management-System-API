const Cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectToCloudinary =  () => {
  try {

     Cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("Successfully connected to Cloudinary DB");
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error);
  }
};

// create a function which can handle the file upload feature
const uploadFile = async (profileImage) => {
  try {
    const result = await Cloudinary.uploader.upload(profileImage);
    console.log("Cloudinary Upload Result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error; 
  }
};

module.exports = connectToCloudinary
// module.exports.uploadFile =  uploadFile;