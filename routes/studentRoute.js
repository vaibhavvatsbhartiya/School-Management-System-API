const express = require("express");
const Student = require("../models/studentSchema");

const router = express.Router();

// Post route to add a new student
router.post("/students/new", async (req, res) => {
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

// GET route to get all students
router.get("/students", async (req, res) => {
  try {
    // fetch all the students from database
    const students = await Student.find();

    // check in DB if there are any student exists
    if (students == 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // Respond with the list of students
    res.status(200).json({
      message: "All students retrieved successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: err.message });
  }
});

//  GET route to get a student by ID
router.get("/students/:id", async (req, res) => {
  try {
    // get id
    const { id } = req.params;

    // find student by id from database
    const student = await Student.findById(id);

    // error handling
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // respond with the student data available
    res.status(200).json({
      message: "Student retrieved successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
});

// PUT route to update student details by ID
router.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, classId, profileImageUrl } = req.body; // Extract the updated details from the request body

    // Validate the input fields
    if (!name && !email && !classId && !profileImageUrl) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    // Find the student by ID
    const student = await Student.findById(id);

    // If student is not found, return 404
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student details
    if (name) student.name = name;
    if (email) student.email = email;
    if (classId) student.classId = classId;
    if (profileImageUrl) student.profileImageUrl = profileImageUrl;

    // Save the updated student document
    await student.save();

    // Respond with the updated student data
    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE route to soft delete a student by ID
router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Soft delete the student by setting isDeleted to true
    student.isDeleted = true;

    // Save the updated student document
    await student.save();

    // Respond with a success message
    res.status(200).json({
      message: "Student soft deleted successfully",
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE route for permanent deletion
router.delete("/students/permanent/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const student = await Student.findByIdAndDelete(id);


    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student permanently deleted successfully",
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;
