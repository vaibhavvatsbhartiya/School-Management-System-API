const express = require("express");
const {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  softDeleteTeacher,
  permanentDeleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

//  POST route to add a new teacher
router.post("/teachers/new", addTeacher);

//  GET route to get all teachers
router.get("/teachers", getAllTeachers);

//  GET route to get a teacher by ID
router.get("/teachers/:id", getTeacherById);

// PUT route to update teacher details by ID
router.put("/teachers/:id", updateTeacher);

// DELETE route to soft delete a student by ID
router.delete("/teachers/:id", softDeleteTeacher);

// DELETE route for permanent deletion
router.delete("/teachers/permanent/:id", permanentDeleteTeacher);

module.exports = router;
