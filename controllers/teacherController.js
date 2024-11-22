// controllers/teacherController.js

const Teacher = require("../models/teacherSchema");
const Student = require("../models/studentSchema");

// POST route to add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, profileImageUrl, subject } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        message:
          "Email already exists, Students are not allowed to signup here.",
      });
    }

    if (!name || !email || !subject) {
      return res
        .status(400)
        .json({ message: "Name, email, and subject are required." });
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newTeacher = new Teacher({ name, email, subject, profileImageUrl });
    await newTeacher.save();

    res.status(201).json({
      message: "Teacher added successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
};

// GET route to get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teacher found" });
    }

    res.status(200).json({
      message: "All teachers retrieved successfully",
      teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
};

// GET route to get a teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

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
};

// PUT route to update teacher details by ID
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, profileImageUrl } = req.body;

    if (!name && !email && !subject && !profileImageUrl) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (subject) teacher.subject = subject;
    if (profileImageUrl) teacher.profileImageUrl = profileImageUrl;

    await teacher.save();

    res.status(200).json({
      message: "Teacher's data updated successfully",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE route to soft delete a teacher by ID
const softDeleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    teacher.isDeleted = true;
    await teacher.save();

    res.status(200).json({
      message: "Teacher soft deleted successfully",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE route for permanent deletion
const permanentDeleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher's data permanently deleted successfully",
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  softDeleteTeacher,
  permanentDeleteTeacher,
};
