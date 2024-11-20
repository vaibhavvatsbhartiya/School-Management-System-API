// imports
const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./config/mongoDB");
const messageSent = require('./messageUI');
const studentRoutes = require('./routes/studentRoute');
const teacherRoutes = require('./routes/teacherRoute')

// express setup
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// setup the first route
app.get("/", (req, res) => {
  res.send(messageSent);
});

// Use the imported routes for students, teachers
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);

// start server
const startServer = async () => {
  try {
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
