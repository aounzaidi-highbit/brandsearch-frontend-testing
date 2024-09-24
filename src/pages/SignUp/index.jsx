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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brandId } = location.state || {};
  const [otpError, setOtpError] = useState('');
  // const [errorMessage, setErrorMessage] = useState("");

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post('/api/dj-rest-auth/google/', {
          access_token: response.access_token,
        });
        console.log(res.data);
        navigate('/');
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
    // setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
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
      console.log("Signup data send successfull, server response:", response);

      if (response) {
        setShowOtpInput(true);
      } else {
        setShowOtpInput(false);
      }

      const token = response.data.key;
      const user = response.data;
      const user_id = user.pk;

      if (!user.is_verified) {
        setLoadingSubmit(false);
        return;
      }

      if (token) {
        localStorage.setItem('access_token', token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("userIsLoggedIn", true);
        console.log("Token stored in localStorage:", token);
        console.log("User ID stored:", user_id);
        navigate(`/review/#DropReview`);
      }
      else {
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
            navigate(`/review/${brandId}#dropReview`);
          } else {
            navigate('/');
          }
        } else {
          console.error("Login failed: Token not provided in response.");
          setLoadingSubmit(false);
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      setFormErrors(error.response?.data || {});
      setLoadingSubmit(false);
      setShowOtpInput(false);
    } finally {
      setLoadingSubmit(false);
      console.log("Signup process completed Successfully.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    try {
      const response = await HTTP_CLIENT.post('/api/auth/otp-verify/', { email: formData.email, otp: otpString });
      if (response) {
        console.log("OTP send successfylly = " + JSON.stringify(response.data))
        console.log("Data in otp = " + "email: " + formData.email + " and otp: " + otpString)
        setOtpError('');
        setShowOtpInput(false);
        navigate("/");

      } else {
        setOtpError('Error in otp');
        console.log("OTP send failed" + response.data)
        console.log("Data in otp else errored = " + formData.email + otpString)
      }
    } catch (error) {
      setOtpError('Error verifying OTP = ' + error.response);
      console.log("Data in errored catch otp = " + formData.email + otpString)
    }
  };

  return (
    <div className="px-4 lg:px-10 mx-auto xsm:py-2 bg-[#f4fbff] xsm:bg-white min-h-screen text-center h-full xsm:mb-6 sm:pt-6 sm:pb-28 xsm:mt-20">
      <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
        Find Reviews, Share Yours, and Discover Companies.
      </p>
      <div className="shadow-box-shadow max-w-3xl mx-auto rounded-[10px] h-full bg-white">
        {showOtpInput ? (
          <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto py-20">
            <h2 className="mb-6">
              <span className="text-2xl font-semibold">
                <span className="gradient xsm:text-xl text-2xl font-semibold">Please Verify OTP</span>
              </span>
            </h2>
            <form className="w-full flex flex-col" onSubmit={handleOtpSubmit} autoComplete='off'>
              <div className="mb-3">
                <p className="text-lg my-2 mx-auto w-[80%]">We have sent you an email verification OTP to your email. Please enter it below to verify your account.</p>
                <div className="flex justify-between mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      required
                      className="p-3 w-20 border-2 text-xl rounded-xl text-center outline-none focus:border-[#87cdff] transition-all duration-300"
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[index] = e.target.value;
                        setOtp(newOtp);
                        if (e.target.value && index < 5) {
                          document.getElementById(`otp-input-${index + 1}`).focus();
                        }
                        if (!e.target.value && index > 0) {
                          document.getElementById(`otp-input-${index - 1}`).focus();
                        }
                      }}
                      id={`otp-input-${index}`}
                    />
                  ))}
                </div>
                {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
              </div>
              <button type="submit" className="gradient2 rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto">
                Verify
              </button>
            </form>
          </div>

        ) : (
          <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto">
            <h2 className="pt-5 mb-6">
              <span className="text-2xl font-semibold">
                <span className="gradient xsm:text-xl text-2xl font-semibold">Create An Account</span>
              </span>
            </h2>
            <form className="w-full flex flex-col" onSubmit={handleSubmit} autoComplete='off'>
              <button
                className="flex mx-auto items-center xsm:gap-[6px] justify-center gap-4 px-4 py-4 font-medium xsm:text-sm text-lg border rounded-full w-[95%] shadow-box-shadow"
                type="button"
                onClick={() => handleGoogleLogin()}
              >
                <img src={google} alt="google" className="w-8" /> Continue With Google
              </button>
              <p className="text-xl mx-auto mt-3">or</p>

              <div className="p-2">
                <div className="sm:flex gap-1 mb-3">
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="first_name"
                      required
                      class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <label
                      for="first_name"
                      class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1 ${formData.first_name ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''}`}>
                      Enter First Name
                    </label>
                  </div>
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="last_name"
                      class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <label
                      for="last_name"
                      class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                      peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1 ${formData.last_name ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''}`}>
                      Enter Last Name
                    </label>
                  </div>
                </div>
                {formErrors.first_name && <p className="text-red-500">{formErrors.first_name}</p>}
                <div className="flex flex-col w-full gap-3">
                  <div class="relative">
                    <input
                      type="text"
                      name="username"
                      required
                      class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <label
                      for="username"
                      class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1 ${formData.username ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''}`}>
                      Enter Username
                    </label>
                  </div>
                  {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
                  <div class="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label
                      for="email"
                      class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${formData.email ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                      Enter Email
                    </label>
                  </div>
                  {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                  <div className="relative">
                    <div className="relative">
                      <div class="relative">
                        <input type={showPassword1 ? "text" : "password"} name="password1" required class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300" value={formData.password1} onChange={handleChange} />
                        <label for="password1" class="absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-valid:-translate-y-1/2 peer-focus:py-0 peer-valid:py-0 peer-focus:mt-0 peer-valid:mt-0 peer-valid:scale-90 peer-focus:bg-[white] peer-valid:bg-white peer-focus:px-1 peer-valid:px-1">Enter Password</label>
                      </div>
                      <img
                        src={showPassword1 ? showPassword : hidePassword}
                        alt="toggle-password1"
                        className="w-6 absolute top-5 right-4 cursor-pointer"
                        onClick={() => setShowPassword1(!showPassword1)}
                      />
                    </div>
                    {formErrors.password1 && <p className="text-red-500">{formErrors.password1}</p>}
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <div class="relative">
                        <input type={showPassword2 ? "text" : "password"} name="password2" required class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300" value={formData.password2} onChange={handleChange} />
                        <label for="password2" class="absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-valid:-translate-y-1/2 peer-focus:py-0 peer-valid:py-0 peer-focus:mt-0 peer-valid:mt-0 peer-valid:scale-90 peer-focus:bg-[white] peer-valid:bg-white peer-focus:px-1 peer-valid:px-1">Confirm Password</label>
                      </div>
                      <img
                        src={showPassword2 ? showPassword : hidePassword}
                        alt="toggle-password2"
                        className="w-6 absolute top-5 right-4 cursor-pointer"
                        onClick={() => setShowPassword2(!showPassword2)}
                      />
                    </div>
                    {formErrors.password2 && <p className="text-red-500">{formErrors.password2}</p>}
                  </div>
                  <div class="relative">
                    <input
                      type="text"
                      name="phone"
                      required
                      class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label
                      for="phone"
                      class={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform 
                    ${formData.email ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''} peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1`}>
                      Enter Phone
                    </label>
                  </div>
                  {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
                </div>
              </div>
              <button type="submit" className="gradient2 rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto">
                {loadingSubmit ? "Loading ..." : "Signup"}
              </button>
            </form>
            <h4 className="text-[#686868] font-xl m-3">
              Already Have An Account?
              <span className="gradient">
                <Link to="/signin" className="ml-1">Login</Link>
              </span>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
