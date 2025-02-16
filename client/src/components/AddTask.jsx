import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BreadCrumbs from './BreadCrumbs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddTask = () => {
  // Set default values for category and priority
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      category: 'personal',
      priority: 'low',
    },
  });
  const [dueDate, setDueDate] = useState(null);
  // subtasks can be empty; we store them as an array of objects
  const [subtasks, setSubtasks] = useState([{ text: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const onSubmit = async (data) => {
    const preparedSubtasks = subtasks
      .filter(subtask => subtask.text.trim() !== '')
      .map(subtask => ({ text: subtask.text, completed: false }));

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
          withCredentials: true, // This is crucial for cookies
          headers: {
            'Content-Type': 'application/json',
          },
         }
      );
      
      setMessage("Task created successfully!");
      if(response.data.success){
        setTimeout(() => {
          navigate('/user');
        }, 1500);
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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-300">
      <BreadCrumbs />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Task Name <span className="text-red-600">*</span>
          </label>
          <input
            {...register('taskName', { required: true })}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.taskName ? 'border-red-500' : 'border-gray-400'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.taskName && (
            <span className="text-sm text-red-500">Task name is required</span>
          )}
        </div>

        {/* Description (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task description (optional)"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Due Date <span className="text-red-600">*</span>
          </label>
          <DatePicker
            required
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholderText="Select due date"
          />
        </div>

        {/* Priority (default low) */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Priority <span className="text-gray-400">(default low)</span>
          </label>
          <select
            {...register('priority')}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Category (default personal) */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Category <span className="text-gray-400">(default personal)</span>
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Subtasks (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Subtasks (optional)
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
                className="flex-1 px-4 py-2 rounded-lg border border-gray-400"
                placeholder={`Subtask ${index + 1}`}
              />
              {subtasks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className="px-3 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            <span className="mr-1">+</span> Add Subtask
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center text-sm text-green-600">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
