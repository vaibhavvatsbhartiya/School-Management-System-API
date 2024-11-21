const express = require("express");
const Teacher = require("../models/teacherSchema");
const Class = require("../models/classSchema");
const mongoose = require('mongoose')

const router = express.Router();

// 1. **POST** /classes - Create a new class
router.post("/classes/new", async (req, res) => {
  try {
    const { name, teacherId, studentCount, grade } = req.body;

    // Validate teacherId
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res
        .status(400)
        .json({ message: "Teacher not found with the provided ID" });
    }

    // Create the new class if teacher exists
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
});

// 2. **GET** /classes - Get all classes
router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching classes", error });
  }
});

// 3. **GET** /classes/:id - Get a class by ID
router.get("/classes/:id", async (req, res) => {
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
});

module.exports = router;
