import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const TaskDetails = () => {
  const { tasks, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const allTasks = tasks || [];
  const tasksList = allTasks.filter(task => task.status !== 'completed');

  // Status styles with better contrast
  const statusStyles = {
    pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
  };

  // Priority colors with clear differentiation
  const priorityStyles = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-orange-600 dark:text-orange-400',
    high: 'text-red-600 dark:text-red-400',
  };

  const truncate = (content) => {
    if (!content) return null;
    return content.length > 25 ? content.substr(0, 22) + "..." : content;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Your Tasks
        </h1>

        {tasksList.length === 0 ? (
          <div className="text-center py-12 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">
              No tasks found. Create your first task to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasksList.map((task) => (
              <Link
                to={`/user/tasks/${task._id}`}
                key={task._id}
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {task.taskName}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[task.status]}`}>
                      {task.status}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
                    {truncate(task.description)}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Priority:</span>
                      <span className={`font-medium ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>

                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">
                          Subtasks ({task.subtasks.filter((st) => st.completed).length} of {task.subtasks.length})
                        </h3>
                        <div className="space-y-2">
                          {task.subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div
                                className={`flex-shrink-0 w-4 h-4 mr-3 rounded-sm flex items-center justify-center ${
                                  subtask.completed
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
                                }`}
                              >
                                {subtask.completed && (
                                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M10.28 2.28L4 8.563 1.72 6.28a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z" />
                                  </svg>
                                )}
                              </div>
                              <span className={`${subtask.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                {subtask.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created: {new Date(task.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
