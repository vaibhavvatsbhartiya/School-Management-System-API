const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Grade 1A', 'Grade 1B', 'Grade 2A', 'Grade 2B', 'Grade 3A', 'Grade 3B',
      'Grade 4A', 'Grade 4B', 'Grade 5A', 'Grade 5B', 'Grade 6A', 'Grade 6B',
      'Grade 7A', 'Grade 7B', 'Grade 8A', 'Grade 8B', 'Grade 9A', 'Grade 9B',
      'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'
    ],
    default: 'Grade not set',
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teachers",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentCount: {
    type: Number,
    default: 0
  },
  subjects: {
    type: [String],
    required: true,
    enum: [
      'English', 'Mathematics', 'Science', 'Social Studies', 'Art', 'Physical Education', 
      'Music', 'Computer Science', 'History', 'Geography', 'Language (e.g., Spanish, French)',
      'Economics', 'ICT', 'Business Studies', 'Psychology',
    ],
    validate: {
      validator: function(value) {
        return value.length > 0;
      },
      message: 'Subjects are required for each class.'
    },
    default: ['English', 'Mathematics', 'Computer Science', 'Social Studies' ]
  }
});

const Class = mongoose.model("Classes", classSchema);

module.exports = Class;
