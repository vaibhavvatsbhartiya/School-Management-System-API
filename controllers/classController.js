// controllers/classController.js

const Class = require("../models/classSchema");
const Teacher = require("../models/teacherSchema");
const mongoose = require("mongoose");

// 1. Create a new class
const createClass = async (req, res) => {
  try {
    const { name, teacherId, studentCount, grade } = req.body;

    // Validate teacherId
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res
        .status(400)
        .json({ message: "Teacher not found with the provided ID" });
    }

    // Create the new class
    const newClass = new Class({
      name,
      teacherId,
      studentCount,
      grade,
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating class", error });
  }
};

// 2. Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

// 3. Get a class by ID
const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    // Validate that the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching class", error });
  }
};

// 4. Update class details
const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, teacherId, studentCount, grade } = req.body;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, teacherId, studentCount, grade },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class", error });
  }
};

// 5. Delete a class by ID
const permanentDeleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const classData = await Class.findByIdAndDelete(id);

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({
      message: "Class's data permanently deleted successfully",
      classData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  permanentDeleteClass,
};
