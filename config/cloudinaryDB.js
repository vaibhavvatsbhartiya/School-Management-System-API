const Cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectToCloudinary = async () => {
  try {
    // console.log('Cloudinary Config:', {
    //   cloud_name: process.env.CLOUD_NAME,
    //   api_key: process.env.API_KEY,
    //   api_secret: process.env.API_SECRET,
    // });

    Cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    // Test connection by calling Cloudinary API ping
    // const accountInfo = await Cloudinary.api.ping();
    // console.log('Cloudinary Account Info:', accountInfo);

    console.log('Successfully connected to Cloudinary DB');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error);
  }
};



// create a function which can handle the file upload feature
const uploadFile = async (filePath) => {
    try {
        const result = await Cloudinary.uploader.upload(filePath); 
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = uploadFile; 
module.exports = connectToCloudinary;