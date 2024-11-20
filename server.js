// imports
const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./config/MongoDB");
const messageSent = require('./messageUI');


// express setup
const app = express();

const PORT = process.env.PORT || 3000;

// setup the first route
app.get("/", (req, res) => {
  res.send(messageSent);
});

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
