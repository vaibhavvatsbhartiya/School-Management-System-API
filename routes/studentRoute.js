const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  softDeleteStudentById,
  permanentDeleteStudentById,
} = require('../controllers/studentController');

const verifyToken = require('../jwt_auth/jwt');

const router = express.Router();

// Post route to add a new student
router.post("/students/new", verifyToken("Admin"), addStudent);

// GET route to get all students
router.get("/students", getAllStudents);

//  GET route to get a student by ID
router.get("/students/:id", getStudentById);

// PUT route to update student details by ID
router.put("/students/:id", verifyToken("Admin"), updateStudentById);

// DELETE route to soft delete a student by ID
router.delete("/students/:id", verifyToken("Admin"), softDeleteStudentById);

// DELETE route for permanent deletion
router.delete("/students/permanent/:id", verifyToken("Admin"), permanentDeleteStudentById);


module.exports = router;
