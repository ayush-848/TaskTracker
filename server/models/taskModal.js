const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
    required: true
  },
  subtasks: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Task", taskSchema);
