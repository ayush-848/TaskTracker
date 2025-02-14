import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
      className="cursor-pointer relative w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
    >
      {/* Sun Icon (Left) */}
      <div className="absolute left-1 top-1 flex items-center justify-center w-6 h-6">
        <span
          className={`transition-colors duration-300 text-xl${
            isDark ? "text-gray-400 " : "text-yellow-500"
          }`}
        >
          ☀️
        </span>
      </div>

      {/* Moon Icon (Right) */}
      <div className="absolute right-1 top-1 flex items-center justify-center w-6 h-6">
        <span
          className={`transition-colors duration-300 text-xl ${
            isDark ? "text-indigo-400" : "text-amber-500 "
          }`}
        >
          🌙
        </span>
      </div>

      {/* Sliding Toggle Indicator */}
      <div
        className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
