// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import AddTask from './components/AddTask';
import SignUp from './pages/SignUp';
import './App.css'
import Dashboard from './components/Dashboard';
import Home from './pages/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes nested in Layout share the same sidebar/header */}
        <Route path="/" element={<Home />}/>
        <Route path="/user" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="*" element={<>Page Does not exists</>} />
          {/* Add additional nested routes as needed */}
        </Route>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </Router>
  );
};

export default App;
