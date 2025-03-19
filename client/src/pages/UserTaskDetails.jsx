import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';


const TaskDetails = () => {
  const { id } = useParams(); // Task ID from URL
  const [task, setTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});
  // newPriority holds the alternative priority selected by the user (if any)
  const [newPriority, setNewPriority] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task details on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tasks/user/${id}`,
          { withCredentials: true }
        );
        const fetchedTask = response.data.task;
        setTask(fetchedTask);
        // Initialize the editable fields
        setUpdatedTask({
          taskName: fetchedTask.taskName,
          description: fetchedTask.description,
          priority: fetchedTask.priority,
        });
        // Clear any newPriority selection
        setNewPriority('');
      } catch (err) {
        console.error(err);
        setError('Error fetching task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Toggle subtask completion (optimistic update)
  const handleToggleSubtask = async (subtaskId) => {
    const newSubtasks = task.subtasks.map((subtask) =>
      subtask._id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    const updatedTaskData = { ...task, subtasks: newSubtasks };
    setTask(updatedTaskData);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/user/edit/${task._id}`,
        { subtasks: newSubtasks },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      // Optionally: revert the optimistic update on error.
    }
  };

  // Handle input changes for editing fields (except priority)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated task details (includes newPriority if selected)
  const handleSaveEdit = async () => {
    const payload = {};
    if (updatedTask.taskName !== task.taskName) {
      payload.taskName = updatedTask.taskName;
    }
    if (updatedTask.description !== task.description) {
      payload.description = updatedTask.description;
    }
    // Only update priority if the user selected a new one
    if (newPriority && newPriority !== task.priority) {
      payload.priority = newPriority;
    }

    // If nothing changed, exit edit mode
    if (Object.keys(payload).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/user/edit/${task._id}`,
        payload,
        { withCredentials: true }
      );
      // Update local task state with the returned task data
      setTask(response.data.task);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Error updating task');
    }
  };

  // Cancel editing and revert changes
  const handleCancelEdit = () => {
    setUpdatedTask({
      taskName: task.taskName,
      description: task.description,
      priority: task.priority,
    });
    setNewPriority('');
    setIsEditing(false);
  };

  // Mark task as done: update the task's status to "completed"
  const markTaskAsDone = async () => {
    // Optimistically update the local task state
    const updated = { ...task, status: "completed" };
    setTask(updated);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/user/edit/${task._id}`,
        { status: "completed" },
        { withCredentials: true }
      );
      setTask(response.data.task);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Error marking task as done');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6">
            {isEditing ? (
              <input
                type="text"
                name="taskName"
                value={updatedTask.taskName}
                onChange={handleInputChange}
                className="text-3xl font-bold text-gray-900 dark:text-gray-100 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {task.taskName}
              </h1>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                <span className="text-indigo-700 dark:text-indigo-300">
                  <strong>Due:</strong>{' '}
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : task.priority === 'medium'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}
              >
                {isEditing ? (
                  <select
                    name="priority"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="bg-transparent focus:outline-none"
                  >
                    <option value="" disabled>
                      Change priority
                    </option>
                    {['low', 'medium', 'high']
                      .filter((p) => p !== task.priority)
                      .map((p) => (
                        <option key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </option>
                      ))}
                  </select>
                ) : (
                  <span className="capitalize">{task.priority} Priority</span>
                )}
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  task.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : task.status === 'in-progress'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="capitalize">{task.status}</span>
              </div>
            </div>

            {/* Mark as Done Button */}
            {task.status !== "completed" && (
              <button
                onClick={markTaskAsDone}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Mark as Done
              </button>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              Description
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                value={updatedTask.description}
                onChange={handleInputChange}
                className="w-full text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none"
                rows="4"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {task.description || 'No description provided'}
              </p>
            )}
          </div>

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                Subtasks ({task.subtasks.filter((st) => st.completed).length} / {task.subtasks.length})
              </h2>
              <ul className="space-y-2">
                {task.subtasks.map((subtask, index) => (
                  <li
                    key={subtask._id || index}
                    className="flex items-center space-x-3 group cursor-pointer"
                    onClick={() => handleToggleSubtask(subtask._id)}
                  >
                    <div
                      className={`w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
                        subtask.completed
                          ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {subtask.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`transition-colors ${
                        subtask.completed
                          ? 'text-gray-400 dark:text-gray-500 line-through'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {subtask.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">Created:</span>{' '}
                {new Date(task.timestamp).toLocaleDateString()}
              </div>
            </div>

            {/* Edit / Save / Cancel Buttons */}
            <div className="mt-4 sm:mt-0 flex gap-2">
  {isEditing ? (
    <>
      <button
        onClick={handleSaveEdit}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save
      </button>
      <button
        onClick={handleCancelEdit}
        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
      >
        Cancel
      </button>
    </>
  ) : (
    task.status !== 'completed' && (
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Task
      </button>
    )
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
