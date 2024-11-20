const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileImageUrl: {
    type: String
  },
});

const student = mongoose.model("Students", studentSchema);

module.exports = student;
