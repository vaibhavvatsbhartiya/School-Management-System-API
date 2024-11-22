const Student = require('../models/studentSchema');

// POST: Add a new student
const addStudent = async (req, res) => {
  try {
    const { name, email, classId, profileImageUrl } = req.body;

    // Validate the required fields
    if (!name || !email || !classId) {
      return res.status(400).json({ message: 'Name, email, and classId are required.' });
    }

    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new student document
    const newStudent = new Student({ name, email, classId, profileImageUrl });

    // Save the student to the database
    await newStudent.save();

    // Respond with the newly created student
    res.status(201).json({
      message: 'Student added successfully',
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: 'Server error', error: error.message });
  }
};

// GET: Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.status(200).json({
      message: 'All students retrieved successfully',
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: 'Server error', error: error.message });
  }
};

// GET: Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: "Student's data  retrieved successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: 'Server error', error: error.message });
  }
};

// PUT: Update student details by ID
const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, classId, profileImageUrl } = req.body;

    if (!name && !email && !classId && !profileImageUrl) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (name) student.name = name;
    if (email) student.email = email;
    if (classId) student.classId = classId;
    if (profileImageUrl) student.profileImageUrl = profileImageUrl;

    await student.save();

    res.status(200).json({
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE: Soft delete a student by ID
const softDeleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.isDeleted = true;
    await student.save();

    res.status(200).json({
      message: 'Student soft deleted successfully',
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE: Permanent deletion of a student by ID
const permanentDeleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student permanently deleted successfully',
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  softDeleteStudentById,
  permanentDeleteStudentById,
};
