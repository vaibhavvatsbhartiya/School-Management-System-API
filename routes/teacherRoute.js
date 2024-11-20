const express = require("express");
const Teacher = require("../models/teacherSchema");
const Student = require("../models/studentSchema");

const router = express.Router();

router.post("/teachers/new", async (req, res) => {
  try {
    const { name, email, profileImageUrl, subject } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          message:
            "Email already exists, Students are not allowed to signup here.",
        });
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

//  GET route to get a teacher by ID
router.get("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    // error handling
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher's data retrieved successfully",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
});

// PUT route to update teacher details by ID
router.put("/teachers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, subject, profileImageUrl } = req.body; // Extract the updated details from the request body
  
      // Validate the input fields
      if (!name && !email && !subject && !profileImageUrl) {
        return res
          .status(400)
          .json({ message: "At least one field is required to update" });
      }
  
      // Find the student by ID
      const teacher = await Teacher.findById(id);
  
      // If student is not found, return 404
      if (!teacher) {
        return res.status(404).json({ message: "teacher not found" });
      }
  
      // Update the teacher details
      if (name) teacher.name = name;
      if (email) teacher.email = email;
      if (subject) teacher.subject = subject;
      if (profileImageUrl) teacher.profileImageUrl = profileImageUrl;
  
      // Save the updated student document
      await teacher.save();
  
      // Respond with the updated student data
      res.status(200).json({
        message: "Teacher's data updated successfully",
        teacher,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = router;