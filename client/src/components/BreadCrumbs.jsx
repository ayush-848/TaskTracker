import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  // If already on the dashboard, no need to show the link.
  if (location.pathname === '/user') return null;

  return (
    <nav aria-label="breadcrumb">
      <Link 
        to="/user" 
        className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:underline mb-3"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </Link>
    </nav>
  );
};

export default Breadcrumbs;
