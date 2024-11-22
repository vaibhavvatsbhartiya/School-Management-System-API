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
// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();

//     if (students.length === 0) {
//       return res.status(404).json({ message: 'No students found' });
//     }

//     res.status(200).json({
//       message: 'All students retrieved successfully',
//       students,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(501).json({ message: 'Server error', error: error.message });
//   }
// };

// GET route to get all students with pagination
const getAllStudents = async (req, res) => {
  try {
    // Get pagination parameters from query string, default to page 1 and limit 10
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if no page is provided
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 students per page if no limit is provided
    const skip = (page - 1) * limit;  // Calculate how many documents to skip based on the current page

    // Find students with pagination
    const students = await Student.find()
      .skip(skip)
      .limit(limit);

    // Get the total number of students for pagination info
    const totalStudents = await Student.countDocuments();

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    // Return paginated students along with pagination info
    res.status(200).json({
      message: 'Students retrieved successfully',
      students,
      pagination: {
        totalStudents,  // Total number of students in the database
        totalPages: Math.ceil(totalStudents / limit),  // Total pages
        currentPage: page,  // Current page number
        limit,  // Number of items per page
      },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      message: 'Server error, could not retrieve students',
      error: error.message,
    });
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
