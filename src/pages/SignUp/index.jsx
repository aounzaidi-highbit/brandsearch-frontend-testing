import React, { useState } from "react";
import google from "../../assets/images/google.png";
import showPassword from "../../assets/images/showPassword.png";
import hidePassword from "../../assets/images/hidePassword.png";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { HTTP_CLIENT } from "../../utils/axiosClient";

export default function Signup() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brandId } = location.state || {};

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({}); // State to hold validation errors

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post('/api/dj-rest-auth/google/', {
          access_token: response.access_token,
        });
        console.log(res.data);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setFormErrors({
        ...formErrors,
        password2: "Passwords do not match",
      });
      return;
    }
    console.log("Sending signup data:", formData);

    try {
      const response = await HTTP_CLIENT.post('/api/auth/registration', formData);
      console.log("Signup successful, server response:", response);

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
        const loginResponse = await HTTP_CLIENT.post('/api/auth/login', {
          email: formData.email,
          password: formData.password1,
        });

        const { access, refresh, user } = loginResponse.data;
        if (access && refresh) {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          localStorage.setItem('user_id', user.pk);
          if (brandId) {
            navigate(`/business-details/${brandId}#dropReview`);
          } else {
            navigate('/');
          }
        } else {
          console.error("Login failed: Token not provided in response.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      setFormErrors(error.response?.data || {});
    }
  };

  return (
    <div className="px-4 lg:px-10 mx-auto xsm:py-2 bg-[#f4fbff] xsm:bg-white text-center h-full xsm:mb-6 sm:pt-6 sm:pb-28 xsm:mt-20">
      <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
        Find Reviews, Share Yours, and Discover Companies.
      </p>
      <div className="shadow-box-shadow pt-4 max-w-3xl mx-auto rounded-[10px] h-full bg-white">
        <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto">
          <h2 className="pt-5 mb-6">
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
              <div className="sm:flex gap-1 my-1">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                  className="border rounded-xl ml-1 xsm:mb-2 p-4 w-full focus:outline-[#87cdff]"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {formErrors.first_name && <p className="text-red-500">{formErrors.first_name}</p>}
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter Last Name"
                  className="border rounded-xl ml-1 p-4 w-full focus:outline-[#87cdff]"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {formErrors.last_name && <p className="text-red-500">{formErrors.last_name}</p>}
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
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
                  {formErrors.password1 && <p className="text-red-500">{formErrors.password1}</p>}
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
                  {formErrors.password2 && <p className="text-red-500">{formErrors.password2}</p>}
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  className="border rounded-xl p-4 m-1 w-full focus:outline-[#87cdff]"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
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
              <Link to="/signin" className="ml-1">Login</Link>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
