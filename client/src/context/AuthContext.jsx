import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils/messageHandler';
import LogoutAnimation from '../assets/logoutAnimation'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/protected`,
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user); // Include user data (with credits) in the state
        }
      } catch (error) {
        console.error('Error loading user:', error.response?.data?.message || error.message);
        setUser(null);
      } finally {
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const { success, message, user } = response.data;

      if (success) {
        setUser(user);
        handleSuccess(message);
        return true;
      } else {
        handleError(message || 'Login failed.');
        return false;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred.';
      handleError(errorMessage);
      return false;
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess('Account created successfully! Redirecting...');
        return true;
      } else {
        handleError(data.message || 'Something went wrong.');
        return false;
      }
    } catch (error) {
      handleError(error);
      return false;
    }
  };


  const logout = async () => {
    if (!user) return;
  
    setLogoutLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      setUser(null); // Clear user state
  
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Optional delay for smooth transition
  
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Error during logout.';
      handleError(errorMessage);
    } finally {
      setLogoutLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
        <LogoutAnimation isVisible={logoutLoading} />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };