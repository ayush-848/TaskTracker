// components/AddTask.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BreadCrumbs from './BreadCrumbs'
import axios from 'axios'

const AddTask = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dueDate, setDueDate] = useState(null);
  const [subtasks, setSubtasks] = useState([{ text: '' }]);

  const onSubmit = async(data) => {
    const allSubtasks= subtasks.filter(subtask => subtask.text.trim() !== '')
    const payload={
      ...data,
      dueDate,
      allSubtasks
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-task`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { text: '' }]);
  };

  const removeSubtask = (index) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-300">
      <BreadCrumbs/>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Task Name <span className='text-red-600'>*</span>
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Due Date <span className='text-red-600'>*</span>
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

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Priority   &nbsp;<span className='text-gray-400'>(default low)</span>
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

        {/* Subtasks */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
