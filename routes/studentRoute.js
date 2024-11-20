const express = require("express");
const Student = require("../models/studentSchema");

const router = express.Router();

// Post route to add a new student
router.post("/students", async (req, res) => {
  try {
    const { name, email, classId, profileImageUrl } = req.body;

    // Validate the required feilds
    if (!name || !email || !classId) {
      return res
        .status(400)
        .json({ message: "Name, email, and classId are required." });
    }

    // check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create a new student document
    const newStudent = new Student({ name, email, classId, profileImageUrl });

    // save newStudent in database
    await newStudent.save();

    // Respond with the newly created student
    res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;