import React, { useState } from "react";
import footerImg from "../../assets/images/image.png";
import bell from "../../assets/images/bell.svg";
import fb from "../../assets/images/fb.png";
import twitter from "../../assets/images/twitter.png";
import yt from "../../assets/images/yt.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Index() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const [subState, setSubState] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const localConfig = {
    Base_URL: "https://myapi.brandsearchengine.com",
  };

  const defaultConfig = localConfig;

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const fullUrl = `${defaultConfig.Base_URL}/api/subscribe/`;
      if (email === "") {
        setMessage("Please Enter Valid Email");
        return
      }
      const response = await axios.post(fullUrl, {
        email: email,
        subscribe_at: new Date().toISOString(),
      });

      if (response.status >= 200 && response.status < 300) {
        setSubState(true);
        setMessage("Thank you for subscribing!");
        setIsError(false);
      }
    } catch (err) {
      console.error("Error during subscription:", err);
      setMessage("Email already exists. Please use a different email.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubscribe();
  };

  return (
    <div className="bg-footer-image bg-no-repeat w-[100%] bg-top bg-cover">
      <div
        className="container mx-auto relative md:h-80 lg:pt-28"
        data-aos="flip-right"
        data-aos-duration="1500"
      >
        <div className="flex justify-center items-center h-full xsm:w-[90%] sm:w-[65%] mx-auto">
          <img
            src={footerImg}
            alt="Footer Image"
            className="h-[280px] md:h-80 md:mt-12 lg:mt-0 xl:h-[auto]"
          />
        </div>

        {(subState) ? (
          <div className="p-10 lg:mt-32 text-center absolute inset-0 flex flex-col items-center justify-end lg:justify-center">
            <h3 className={`lg:text-4xl md:text-2xl ${isError ? "text-red-500" : "text-[#287BB7] font-bold text-xl mb-20"}`}>
              {message}
            </h3>
          </div>
        ) : (
          <div className="mb-24 lg:mt-44 text-center absolute inset-0 flex flex-col items-center justify-end lg:justify-center">
            <h4 className="font-bold lg:text-4xl xsm:text-2xl md:text-2xl mb-2"><span className="gradient3">Subscribe</span> <span className="font-normal">Now</span></h4>
            <h3 className="md:text-2xl lg:text-4xl">
              <span className="gradient3 font-black xsm:text-xl">Get All </span> <span className="xsm:text-xl">Updates And</span>
              <span className="gradient3 font-black relative xsm:text-xl">
                {" "}Offers
              </span>
            </h3>
            <div className="flex-col lg:flex items-center relative mt-6 lg:mt-10 lg:w-[50%] mx-auto">
              <input
                type="email"
                value={email}
                className="shadow-box-shadow text-[12px] md:text-[15px] focus:outline-none font-medium text-[#287BB7] rounded-lg lg:rounded-full p-2 md:px-4 py-3 md:py-5 bg-white w-full"
                placeholder="Enter Your Email to Stay Updated"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-[#287BB7] justify-center hover:bg-[#287BB7] text-md md:text-xl font-bold px-3 py-2 md:px-4 md:py-[18px] text-white w-full lg:w-[40%] rounded-lg lg:rounded-full lg:rounded-l-none absolute right-0 flex gap-2 items-center"
                onClick={handleButtonClick}
                disabled={loading}
              >
                <img src={bell} className="w-4 sm:w-6" alt="bell icon" />
                Subscribe
              </button>
              <p className="absolute xsm:text-xs mt-1 top-20 text-red-500">
                {message}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:flex justify-between mt-6 items-center container mx-auto py-8">
        <ul className="flex gap-4 items-center mb-6 lg:mb-0">
          <li>
            <a href="#" className="text-[#287BB7]">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
            </a>
          </li>
          <li>
            <a href="#" className="text-[#287BB7]">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>About us</Link>
            </a>
          </li>
          <li>
            <a href="#" className="text-[#287BB7]">
              <Link to="/faqs" onClick={() => window.scrollTo(0, 0)}>Faqs</Link>
            </a>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <div className="">
            <img
              src={fb}
              alt="footer-icon"
              className="transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-200 cursor-pointer"
            />
          </div>
          <div>
            <img
              src={twitter}
              alt="footer-icon"
              className="transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-200 cursor-pointer"
            />
          </div>
          <div>
            <img
              src={yt}
              alt="footer-icon"
              className="w-[3.5rem] transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 duration-200 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="lg:mx-20 mx-4">
        <div className="border-t mt-10 border-[#C7C7C7]"></div>
      </div>
      <div className="flex justify-between items-center px-4 lg:px-32 mx-auto py-8">
        <ul className="flex gap-4 items-center">
          <li>
            <a href="#" className="text-[#287BB7] text-sm">
              <Link to="policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
            </a>
          </li>
        </ul>
        <div className="text-[#287BB7] text-sm">
          <p>Copyright © {year} All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
