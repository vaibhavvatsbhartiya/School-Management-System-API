const mongoose = require("mongoose");
 
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Corrected from Date.now() to Date.now
  },
  profileImageUrl: {
    type: String, // No need for cloudinaryURL as a separate field
    // The URL will be stored directly as a string
  },
  role:{
    type: String,
    enum: ['teacher', 'principal', 'Admin'],
    default: 'teacher',
  }
});

const Teacher = mongoose.model("Teachers", teacherSchema);

module.exports = Teacher;
