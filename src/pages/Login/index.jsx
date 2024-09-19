import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../Middleware/Auth";
import Account from "../../components/Api/Account";
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
  const history = useNavigate();

  const [loading, setLoading] = useState(false);
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [sendingReq, setsendingReq] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [isrememberme, setisrememberme] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [gender, setgender] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setsendingReq(true);
    e.preventDefault();
    const res = Account.LoginApi(credentials);
    res.then((value) => {
      setsendingReq(false);
      if (value !== undefined && value.data.access) {
        //   localStorage.setItem("userIsLoggedIn", true);
        console.log("value ==", value.data);
        localStorage.setItem("access_token", value.data.access);
        localStorage.setItem("refresh_token", value.data.refresh);
        localStorage.setItem("email", value.data.email);
        localStorage.setItem("first_name", value.data.user.first_name);
        localStorage.setItem("last_name", value.data.user.last_name);
        localStorage.setItem("pk", value.data.user.pk);
        goToDashboard();
        // Auth.Login();
      } else seterrorMessage(true);
    });
  };

  const goToDashboard = () => {
    history("/");
    window.location.reload();
  };

  return (
    <div className="px-4 lg:px-10 mx-auto">
      <div className="box-shadow my-20 p-4 lg:p-10 max-w-3xl mx-auto rounded-[10px]">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label
                className="block capital text-[#000] text-[15px] mb-2"
                htmlFor="your-name"
              >
                Your Name
              </label>
              <input
                className="appearance-none box-shadow block w-full bg-transparent text-[#000] border border-[#6cc2ff] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white"
                id="your-name"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <label
                className="block capital text-[#000] text-[15px] mb-2"
                htmlFor="your-email"
              >
                Your Email
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-black box-shadow
                  border border-[#287BB7] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white "
                id="your-email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-6">
              <label
                className="block capital text-[#000] text-[15px] mb-2"
                htmlFor="password"
              >
                Your Password
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-black box-shadow
                  border border-[#287BB7] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white "
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            {sendingReq ? (
              <button
                className="bg-color flex justify-center items-center text-white h-[63px] w-[140px] rounded-[10px] font-medium text-xl lg:text-2xl"
                type="button"
              >
                <RotatingLines
                  visible={true}
                  height="32"
                  width="32"
                  strokeColor="#aa2e2e"
                  color="#aa2e2e"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            ) : (
              <button
                className="bg-color text-white h-[63px] w-[140px] rounded-[10px] font-medium text-xl lg:text-2xl"
                type="submit"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
