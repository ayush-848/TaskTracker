import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList,
  faCheckCircle,
  faSpinner,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TaskDetails from './TaskDetails';

const Dashboard = () => {
  const { user, loading, tasks } = useContext(AuthContext);
  const [pending,setPending]=useState(0)
  const [completed,setCompleted]=useState(0)
  
  useEffect(() => {
    if (tasks) {
      const pendingTasks = tasks.filter(task => task.status === 'pending');
      const completedTasks = tasks.filter(task => task.status === 'completed');
      setPending(pendingTasks.length);
      setCompleted(completedTasks.length)
    }
  }, [tasks]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
console.log(pending)
  const stats = [
    { 
      title: 'Total Tasks',
      value: tasks?.length,
      icon: faClipboardList,
      bgColor: 'bg-blue-100/80',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Tasks Completed',
      value: completed,
      icon: faCheckCircle,
      bgColor: 'bg-emerald-100/80',
      iconColor: 'text-emerald-600'
    },
    { 
      title: 'In Progress',
      value: pending,
      icon: faSpinner,
      bgColor: 'bg-amber-100/80',
      iconColor: 'text-amber-600'
    },
    { 
      title: 'Overdue',
      value: tasks?.length-(completed+pending),
      icon: faExclamationTriangle,
      bgColor: 'bg-rose-100/80',
      iconColor: 'text-rose-600'
    }
  ];

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-gray-200/20 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
                <FontAwesomeIcon 
                  icon={stat.icon} 
                  className={`${stat.iconColor} text-xl`}
                />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-100">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 relative">
        <div className="max-w-2xl">
          <div className="absolute top-0 left-0 w-full h-1" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome to TaskTracker, {user.username}!
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-200">
            Streamline your workflow with our intuitive dashboard.
          </p>
          <Link
            to="/user/add-task"
            className="mt-6 inline-block px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
          >
            Create a task
          </Link>
        </div>
      </div>
      <div>
        <TaskDetails />
      </div>
    </div>
  );
};

export default Dashboard;
