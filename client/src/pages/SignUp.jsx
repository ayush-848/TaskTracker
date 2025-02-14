import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import axios from "axios"; // ensure axios is installed/imported

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

const SignUp = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  // Pre-fill the email field after the component mounts
  useEffect(() => {
    if (emailFromQuery) {
      setValue("email", emailFromQuery);
    }
  }, [emailFromQuery, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          Sign Up
        </h2>

        <InputField
          register={register}
          name="username"
          type="text"
          placeholder="Username"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

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

        <InputField
          register={register}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
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

        <label className="flex items-center px-3 py-3 text-gray-500 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600">
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="ml-2">Profile Photo</span>
          <input {...register("profilePhoto")} type="file" className="hidden" />
        </label>

        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
