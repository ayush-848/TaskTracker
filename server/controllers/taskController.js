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

const getUserTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentDate = new Date();

    // Mark tasks as overdue if dueDate is passed and status is not already 'overdue'
    await Task.updateMany(
      {
        userId: userId,
        dueDate: { $lt: currentDate },
        status: { $ne: 'overdue' }
      },
      { status: 'overdue' }
    );

    // Fetch the updated list of tasks
    const tasks = await Task.find({ userId: userId });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
    });
  }
};


const getTaskInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!id || !userId) {
      return res.status(400).json({ message: "Task ID and User ID are required" });
    }

    const task = await Task.findOne({ _id: id, userId: userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error fetching task details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching task details",
    });
  }
};

// In your task controller (e.g., taskController.js)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Task ID from URL
    const userId = req.user._id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating task",
    });
  }
};

module.exports = { createTask, getUserTasks, getTaskInfo, updateTask };

