// imports
const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./config/mongoDB");
const messageSent = require("./messageUI");
const studentRoutes = require("./routes/studentRoute");
const teacherRoutes = require("./routes/teacherRoute");
const classRoutes = require("./routes/classRoute");
const connectToCloudinary = require("./config/cloudinaryDB");
// const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const teacherLoginRoute = require('./routes/authRoute');

// express setup
const app = express();

const PORT = process.env.PORT ;


// Middleware to parse JSON request bodies
app.use(express.json());
// app.use(fileUpload({
//   useTempFiles: true, // Enables temporary file handling
//   tempFileDir: "/tmp/", // Temporary directory for uploaded files
// }));
app.use(bodyParser.json());



// setup the first route
app.get("/", (req, res) => {
  res.send(messageSent);
});

// Use the imported routes for students, teachers
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api", classRoutes);
app.use("/api", teacherLoginRoute);

// start server
const startServer = async () => {
  try {
    // Connect to Cloudinary before starting the server
    await connectToCloudinary();

    app.listen(PORT, () => {
      const messageSent = `The server is running on port: ${PORT}`;
      console.log(`${messageSent}`);
    });
    connectToDatabase();
  } catch (error) {
    console.log(`Server Error: ${error}`);
  }
};

startServer();
