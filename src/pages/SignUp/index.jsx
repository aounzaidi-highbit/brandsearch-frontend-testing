import React, { useState } from "react";
import google from "../../assets/images/google.png";
import showPassword from "../../assets/images/showPassword.png";
import hidePassword from "../../assets/images/hidePassword.png";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';  // Import axios for making API requests
import { HTTP_CLIENT } from "../../utils/axiosClient";

export default function Signup() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brandId } = location.state || {}; // Safely access brandId

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    phone: "",
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {  // onSuccess callback when Google login is successful
      try {
        // Send the access_token to your backend API for authentication
        const res = await axios.post('/api/dj-rest-auth/google/', {
          access_token: response.access_token,
        });
        console.log(res.data);  // Log the response data (can be removed later)
        navigate('/dashboard');  // Redirect the user to the dashboard after successful login
      } catch (error) {
        console.error('Login failed:', error);  // Log any errors that occur during the login process
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);  // Log any errors if Google login fails
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending signup data:", formData);

    try {
      const response = await HTTP_CLIENT.post('/api/auth/registration', formData);
      console.log("Signup successful, server response:", response);

      // Check if token is returned from signup
      const token = response.data.key;
      const user = response.data;
      const user_id = user.pk;

      if (token) {
        localStorage.setItem('access_token', token);
        localStorage.setItem("user_id", user_id);
        console.log("Token stored in localStorage:", token);
        console.log("User ID stored:", user_id);
        navigate(`/business-details/#DropReview`);
      } else {
        console.log("Token not returned from the server. Attempting to log in.");

        // If no token, attempt login manually
        const loginResponse = await HTTP_CLIENT.post('/api/auth/login', {
          email: formData.email,
          password: formData.password1,  // Use the password provided during signup
        });

        const { access, refresh, user } = loginResponse.data;
        if (access && refresh) {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          localStorage.setItem('user_id', user.pk);
          console.log("User signed in, tokens stored in localStorage.");
          if (brandId) {
            navigate(`/business-details/${brandId}#dropReview`);
          } else {
            navigate('/'); // Fallback if no brandId
          } // Redirect to the "Drop Your Review" section
        } else {
          console.error("Login failed: Token not provided in response.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };


  return (
    <div className="px-4 lg:px-10 mx-auto xsm:py-2 bg-[#f4fbff] text-center h-full xsm:mb-6 sm:pt-6 sm:pb-28">
      <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
        Find Reviews, Share Yours, and Discover Companies.
      </p>
      <div className="shadow-box-shadow pt-4 max-w-3xl mx-auto rounded-[10px] h-full bg-white">
        <div className="flex flex-col items-center w-[70%] mx-auto">
          <h2 className="pt-5  mb-6">
            <span className="text-2xl font-semibold">
              <span className="gradient xsm:text-xl text-2xl font-semibold">Create An Account</span>
            </span>
          </h2>
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <button
              className="flex mx-auto items-center xsm:gap-[6px] justify-center gap-4 px-4 py-4 font-medium xsm:text-sm text-lg border rounded-full w-[95%] shadow-box-shadow"
              type="button"
              onClick={() => handleGoogleLogin()}
            >
              <img src={google} alt="google" className="w-8" /> Continue With Google
            </button>
            <p className="text-xl mx-auto mt-3">or</p>

            <div className="p-2">
              <div className="sm:flex gap-1">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                  className="border rounded-xl ml-1 p-4 w-full focus:outline-[#87cdff]"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="border rounded-xl p-4 w-full focus:outline-[#87cdff]"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    name="password1"
                    placeholder="Enter Password"
                    className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                    value={formData.password1}
                    onChange={handleChange}
                  />
                  <img
                    src={showPassword1 ? hidePassword : showPassword}
                    alt="toggle-password1"
                    className="w-6 absolute top-4 right-4 cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm Password"
                    className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                  <img
                    src={showPassword2 ? hidePassword : showPassword}
                    alt="toggle-password2"
                    className="w-6 absolute top-4 right-4 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  />
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className="gradient2 rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto"
              type="submit"
            >
              Signup
            </button>
          </form>
          <h4 className="text-[#686868] font-xl m-3">
            Already Have An Account?
            <span className="gradient">
              <Link to="/signin"> Signin </Link>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
