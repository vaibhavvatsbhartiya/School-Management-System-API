// controllers/authController.js

const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherSchema");
require("dotenv").config();

const authenticateAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the teacher in the database
    const teacher = await Teacher.findOne({ email });

    // If teacher not found
    if (!teacher) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the role is Admin
    if (teacher.role !== "Admin") {
      return res.status(403).json({ message: "Access Denied! Admin only." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: teacher.email, role: teacher.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error logging in teacher:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports =  authenticateAdmin ;
