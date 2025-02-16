// Layout.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Mail, Bell, User, LogOut,Check } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.svg'
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalCompleted,setTotalCompleted]=useState(0)
  const {tasks}=useContext(AuthContext)
  useEffect(()=>{
    if(tasks){
       const completedTasks=tasks.filter(task=>task.status==='completed')
       setTotalCompleted(completedTasks.length)
    }

  },[tasks])

  const navItems = [
    { name: 'Dashboard', path: '/user', icon: Home },
    { name: 'Completed', path: '/user/completed-tasks', icon: Check, badge: totalCompleted },
    { name: 'Alerts', path: '/user/alerts', icon: Bell, badge: 3 },
    { name: 'Profile', path: '/user/profile', icon: User },
    { name: 'Sign Out', path: '/logout', icon: LogOut },
  ];
  

  return (
    <div className="min-h-screen flex bg-gray-300 dark:bg-gray-950">
      {/* Vertical Navigation */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:shadow-sm shadow-xl bg-gray-100 dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800`}>
        
        {/* Branding */}
        <div className="flex items-center h-16 px-6 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xl font-bold text-gray-900 dark:text-white" id="logo">
  <a href="/"><img src={logo} alt="Logo" className="inline-block h-8 w-8" />
  <span className="text-indigo-600 dark:text-indigo-400">&nbsp;Task</span>Tracker</a>
</span>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 mt-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-2.5 rounded-lg transition-all
                    text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                    hover:bg-gray-50 dark:hover:bg-gray-800/50 group"
                >
                  <item.icon className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 text-xs font-medium rounded-full 
                      bg-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-gray-100 dark:bg-gray-900 
          backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <button
            className="mr-2 lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center flex-1 space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-5">
            <button className="relative p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <ThemeToggle />
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-950" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;