const Cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectToCloudinary = async () => {
  try {
    Cloudinary.config({
      cloud_name: `${process.env.CLOUD_NAME}`,
      api_key: `${process.env.API_KEY}`,
      api_secret: `${process.env.API_SECRET}`,
    });

    // Test connection by calling a Cloudinary API method, e.g., fetching the current account details
    // const accountInfo = await Cloudinary.api.ping();
    
    console.log('Successfully connected to Cloudinary'); // Log the successful connection
  
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error); 
  }
};

connectToCloudinary();

module.exports = { connectToCloudinary };