import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BreadCrumbs from './BreadCrumbs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1) Import icons from react-icons/fa
import {
  FaTasks,
  FaRegStickyNote,
  FaCalendarAlt,
  FaExclamationCircle,
  FaFolderOpen,
  FaListUl,
} from 'react-icons/fa';

const AddTask = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      category: 'personal',
      priority: 'low',
    },
  });

  const [dueDate, setDueDate] = useState(null);
  const [subtasks, setSubtasks] = useState([{ text: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const preparedSubtasks = subtasks
      .filter((subtask) => subtask.text.trim() !== '')
      .map((subtask) => ({ text: subtask.text, completed: false }));

    const payload = {
      taskName: data.taskName,
      description: data.description || "",
      dueDate: dueDate ? dueDate.toISOString() : null,
      priority: data.priority || "low",
      category: data.category || "personal",
      status: 'pending',
      subtasks: preparedSubtasks,
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-task`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage("Task created successfully!");
      if (response.data.success) {
        setTimeout(() => {
          window.location.href = '/user';
        }, 1000);
      }
      setDueDate(null);
      setSubtasks([{ text: '' }]);
    } catch (error) {
      console.error("Error creating task:", error);
      setMessage(error.response?.data?.message || "Error creating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { text: '' }]);
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700">
      <BreadCrumbs />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
            <FaTasks className="inline-block mr-2 text-indigo-500" />
            Task Name <span className="text-red-600">*</span>
          </label>
          <input
            {...register('taskName', { required: true })}
            className={`w-full px-4 py-2 rounded-lg border
              ${errors.taskName ? 'border-red-500' : 'border-gray-400 dark:border-gray-600'}
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          {errors.taskName && (
            <span className="text-sm text-red-500">Task name is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
            <FaRegStickyNote className="inline-block mr-2 text-indigo-500" />
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register('description', { required: true })}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter task description"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
            <FaCalendarAlt className="inline-block mr-2 text-indigo-500" />
            Due Date <span className="text-red-600">*</span>
          </label>
          <DatePicker
            required
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholderText="Select due date"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
            <FaExclamationCircle className="inline-block mr-2 text-indigo-500" />
            Priority
          </label>
          <select
            {...register('priority')}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
            <FaFolderOpen className="inline-block mr-2 text-indigo-500" />
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Subtasks */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
            <FaListUl className="inline-block mr-2 text-indigo-500" />
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={subtask.text}
                onChange={(e) => {
                  const newSubtasks = [...subtasks];
                  newSubtasks[index].text = e.target.value;
                  setSubtasks(newSubtasks);
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Subtask ${index + 1}`}
              />
              {subtasks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="text-indigo-500 dark:text-indigo-400 hover:underline mt-2"
          >
            + Add Another Subtask
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          // Updated button colors to use indigo
          className="w-full bg-indigo-500 dark:bg-indigo-600 text-white py-2 px-4 rounded-lg
            hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>

      {/* Optional success/error message */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-800 dark:text-gray-200">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddTask;
