import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent backdrop-blur-xs" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-indigo-400">
          TaskTracker
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-300 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <a
            href="#"
            className="block text-slate-300 py-2 hover:text-indigo-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="block text-slate-300 py-2 hover:text-indigo-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-slate-300 py-2 hover:text-indigo-400 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="block text-slate-300 py-2 hover:text-indigo-400 transition-colors"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
