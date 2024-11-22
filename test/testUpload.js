const {connectToCloudinary, uploadFile}  = require("../config/cloudinaryDB"); 
// const uploadFile =  require("../config/cloudinaryDB");
// Example usage
(async () => {
  try {
    // Connect to Cloudinary
    await connectToCloudinary();

    // Upload a test image to Cloudinary
    const result = await uploadFile("./vvimg.jfif"); 
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
