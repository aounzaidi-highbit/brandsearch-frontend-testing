import React, { useEffect, useState } from "react";
import google from "../../assets/images/google.svg";
import showPassword from "../../assets/images/showPassword.png";
import hidePassword from "../../assets/images/hidePassword.png";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";
import { signIn, verifyOtp } from "../../services/business";

const SignIn = ({ brandId, text, customStyles = {} }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    try {
      const response = await verifyOtp(formData.email, otpString);
      if (response) {
        await handleSubmit();
      } else {
        setOtpError('Error in OTP verification, invalid response.');
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response && error.response.data) {
        setOtpError(error.response.data.detail || "Invalid OTP.");
      } else {
        setOtpError("Something went wrong, please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoadingSubmit(true);
    try {
      const response = await signIn(formData.email, formData.password);
      console.log("Response from server:", response.data);

      if (response.data.non_field_errors) {
        setErrorMessage(response.data);
      } else {
        const { access, refresh, user } = response.data;
        const user_id = user.pk;

        if (access && refresh) {
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("first_name", user.first_name);
          localStorage.setItem("last_name", user.last_name);
          navigate("/");
        } else {
          setErrorMessage(response.data.non_field_errors);
        }
      }
    } catch (error) {
      if (error.response.data.non_field_errors && error.response.data.non_field_errors[0].includes("Your account has not been verified")) {
        setErrorMessage(error.response.data.non_field_errors[0] + " Please click below to verify first and try again to signin.");
        setVerificationError(true);
      }
      else
        setErrorMessage(error.response.data.non_field_errors[0]);
      console.error("Login failed:", error.response.data.non_field_errors[0]);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const [bgColor, setBgColor] = useState("#f4fbff");
  const updateBgColor = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setBgColor("#ffffff");
    } else {
      setBgColor("#f4fbff");
    }
  };

  useEffect(() => {
    updateBgColor();
    window.addEventListener('resize', updateBgColor);
    return () => {
      window.removeEventListener('resize', updateBgColor);
    };
  }, []);

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

  return (
    <div
      className="px-4 lg:px-10 mx-auto xsm:py-2 text-center sm:pt-6 sm:pb-60 xsm:mt-2"
      style={{
        backgroundColor: customStyles.backgroundColor || bgColor,
        height: customStyles.height || 'h-full',
      }}
    >
      <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
        Find Reviews, Share Yours, and Discover Companies.
      </p>
      <div className="shadow-box-shadow flex justify-center items-center max-w-3xl mx-auto rounded-[10px] h-[65vh] xsm:h-auto py-64 bg-white">
        {showOtpInput ? (
          <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto py-20">
            <h2 className="mb-6">
              <span className="text-2xl font-semibold">
                <span className="gradient xsm:text-xl text-2xl font-semibold">Verify Your Account</span>
              </span>
            </h2>
            <form className="w-full flex flex-col" onSubmit={handleOtpSubmit} autoComplete='off'>
              <div className="mb-3">
                <p className="text-lg my-2 mx-auto w-[80%]">We have sent an email verification OTP to your email. Please enter it below to verify your account and signin.</p>
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
                {otpError && <p className="text-red-500">{otpError}</p>}
              </div>
              <button type="submit" className="gradient2 rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto">
                Verify
              </button>
            </form>
          </div>)
          :
          (<div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto">
            <h2 className="pt-5 mb-6">
              <span className="xsm:text-xl text-2xl gap-2 flex">
                <span className="gradient font-semibold">Login {text}</span>
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
                <div className="flex flex-col gap-5 w-full my-8">
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

                  <div className="relative">
                    <div class="relative">
                      <input type={showPassword1 ? "text" : "password"} name="password" required class="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300" value={formData.password} onChange={handleChange} />
                      <label for="email" class="absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-valid:-translate-y-1/2 peer-focus:py-0 peer-valid:py-0 peer-focus:mt-0 peer-valid:mt-0 peer-valid:scale-90 peer-focus:bg-[white] peer-valid:bg-white peer-focus:px-1 peer-valid:px-1">Enter Password</label>
                    </div>
                    <img
                      src={showPassword1 ? showPassword : hidePassword}
                      alt="toggle-password1"
                      className="w-6 absolute top-5 right-4 cursor-pointer"
                      onClick={() => setShowPassword1(!showPassword1)}
                    />
                    <Link to="/forgot-password" className="cursor-pointer absolute right-0 mt-2 text-[#287BB7]" onClick={() => window.scrollTo(0, 0)}>Forgot Password?</Link>
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-red-500 px-10">{errorMessage}</p>
                )}
              </div>
              {verificationError ?
                (<button
                  className="bg-[#287BB7] rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto"
                  onClick={() => setShowOtpInput(true)}
                >
                  Verify Now
                </button>)
                :
                (<button
                  className="bg-[#287BB7] rounded-full font-bold text-white px-4 py-4 w-[95%] mx-auto"
                  type="submit"
                >
                  {loadingSubmit ? "Signing in ..." : "Signin"}
                </button>)}
            </form>
            <h4 className="text-[#686868] font-xl m-3">
              Don't Have An Account?
              <Link to="/signup" className="text-[#287BB7]" state={{ brandId }}> Sign Up </Link>
            </h4>
          </div>)}
      </div>
    </div>
  );
};
export default SignIn;