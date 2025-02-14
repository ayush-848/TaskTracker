import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/messageHandler";

const InputField = ({ register, name, type, placeholder, icon }) => (
  <div className="relative flex items-center mt-4">
    <span className="absolute left-3 text-gray-400">{icon}</span>
    <input
      {...register(name, { required: `${placeholder} is required` })}
      type={type}
      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300"
      placeholder={placeholder}
    />
  </div>
);

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Login successful:", response.data);
      handleSuccess("Login successful");
        setTimeout(() => {
          navigate('/user');
        }, 1500);
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error.message
      );
      handleError(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          Log In
        </h2>

        <InputField
          register={register}
          name="email"
          type="email"
          placeholder="Email"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />

        <InputField
          register={register}
          name="password"
          type="password"
          placeholder="Password"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
