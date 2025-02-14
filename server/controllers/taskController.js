const Task = require('../models/taskModal');

const createTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskName, description, dueDate, priority, status, subtasks } = req.body;
    const newTask = await Task.create({
      userId,
      taskName,
      description,
      dueDate,
      priority,
      status,
      subtasks,
    });

    return res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask };
