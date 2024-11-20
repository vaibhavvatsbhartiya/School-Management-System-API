const express = require("express");
const Teacher = require("../models/teacherSchema");
const Student = require("../models/studentSchema")

const router = express.Router();


router.post("/teachers/new", async (req, res) => {
  try {
    const { name, email, profileImageUrl, subject } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists, Students are not allowed to signup here." });
    }
    // Validate the required feilds
    if (!name || !email || !subject) {
      return res
        .status(400)
        .json({ message: "Name, email, and classId are required." });
    }
    // check if the email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create a new student document
    const newTeacher = new Teacher({ name, email, subject, profileImageUrl });

    // save newStudent in database
    await newTeacher.save();

    // Respond with the newly created student
    res.status(201).json({
      message: "Teacher added successfully",
      student: newTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
});

router.get("/teachers", async (req, res) => {
    try {
      const teachers = await Teacher.find();
  
      // check in DB if there are any student exists
      if (teachers == 0) {
        return res.status(404).json({ message: "No teacher found" });
      }
  
      // Respond with the list of students
      res.status(200).json({
        message: "All teachers retrieved successfully",
        teachers,
      });
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: "Server error", error: err.message });
    }
  });

module.exports = router;