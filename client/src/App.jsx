// App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components
const Layout = lazy(() => import('./layout/Layout'));
const AddTask = lazy(() => import('./components/AddTask'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Home =  import('./pages/Home');

const App = () => {
  return (
    <Router>
      {/* Wrap your routes with Suspense to show a fallback while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="*" element={<>Page Does not exist</>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
