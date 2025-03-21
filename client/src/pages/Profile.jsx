import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          No user data available.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Profile Information
        </h1>
        <div className="space-y-5">
          {[ 
            { icon: <FaUser className="text-blue-500" />, label: "Name", value: user.username },
            { icon: <FaEnvelope className="text-blue-500" />, label: "Email", value: user.email || "Not provided" },
            { icon: <FaCalendarAlt className="text-blue-500" />, label: "Joined on", value: formatDate(user.createdAt) },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              {item.icon}
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
