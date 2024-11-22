const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  permanentDeleteClass,
} = require("../controllers/classController");


const verifyToken = require('../jwt_auth/jwt');


const router = express.Router();

// 1. **POST** /classes - Create a new class
router.post("/classes/new", verifyToken("Admin"), createClass);

// 2. **GET** /classes - Get all classes
router.get("/classes", getAllClasses);

// 3. **GET** /classes/:id - Get a class by ID
router.get("/classes/:id", getClassById);

// 4. **PUT** /classes/:id - Update class details : ********* I don't to its working or not as its not verify yet.*********
router.put("/classes/:id", verifyToken("Admin"), updateClass);

// 5. **DELETE** /classes/:id - Delete a class by ID
router.delete("/classes/permanent/:id", verifyToken("Admin"), permanentDeleteClass);

module.exports = router;
