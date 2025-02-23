// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import AddTask from './components/AddTask';
import SignUp from './pages/SignUp';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext'; // adjust path if needed
import './App.css';
import { ToastContainer } from 'react-toastify';
import UserTaskDetails from './pages/UserTaskDetails';
import CompletedTasks from './pages/CompletedTasks';


const App = () => {
  return (
     <AuthProvider>
       <Router>
        <ToastContainer/>
        <Routes>
          {/* Routes that don't require auth */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/user" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-task" element={<AddTask />} />
          <Route path="tasks/:id" element={<UserTaskDetails/>}/>
          <Route path="completed-tasks" element={<CompletedTasks/>} />
            <Route path="*" element={<>Page Does not exist</>} />
          </Route>
        </Routes>
      </Router>
     </AuthProvider>
  );
};

export default App;
