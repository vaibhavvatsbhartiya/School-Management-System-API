const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  softDeleteStudentById,
  permanentDeleteStudentById,
} = require('../controllers/studentController');

const router = express.Router();

// Post route to add a new student
router.post("/students/new", addStudent);

// GET route to get all students
router.get("/students", getAllStudents);

//  GET route to get a student by ID
router.get("/students/:id", getStudentById);

// PUT route to update student details by ID
router.put("/students/:id", updateStudentById);

// DELETE route to soft delete a student by ID
router.delete("/students/:id", softDeleteStudentById);

// DELETE route for permanent deletion
router.delete("/students/permanent/:id", permanentDeleteStudentById);


module.exports = router;
