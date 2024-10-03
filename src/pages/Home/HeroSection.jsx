import React, { useState } from "react";
import brandsIcon from "../../assets/images/brands-icon.png";
import search from "../../assets/images/search.svg";
import { Link, useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/business-list?name=${name}`);
    }
  };

  return (
    <div className="xsm:px-8 bg-hero-background bg-no-repeat h-full" data-aos="zoom-in" data-aos-delay="300">
      <div className="flex justify-evenly items-center h-[80vh]">
        <div className="sm:w-9/12 lg:w-2/5">
          <div className="flex">
            <h2 className="text-4xl xsm:text-4xl lg:text-5xl 2xl:text-7xl mb-8 lg:mb-0 lg:w-[90%]">
              <span className="font-normal block">Explore All </span>
              <span className="font-bold text-Primary inline-block relative">
                Available
              </span>{" "}
              listings
            </h2>
            {/* <div className="lg:w-[20%] -mr-80 hidden lg:block ">
              <img src={frame} />
            </div> */}
          </div>
          <p className="text-[#464F54] lg:text-xl my-8 xsm:my-2">
            Discover top clothing brands, leave your reviews, and shape the future of fashion. Your opinion drives the trends.
          </p>
          <div className="flex items-center relative my-6">
            <input
              value={name}
              onKeyDown={handleKeyDown}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="box-shadow text-[15px] focus:outline-none font-medium text-[#464F54] rounded-lg px-4 py-4 bg-white w-full border"
              placeholder="Find Perfect Business"
            />
            <Link
              className="absolute right-0"
              to={`/business-list?name=${name}`}
            >
              <button className="bg-Primary hover:bg-Primary text-2xl font-bold px-6 py-3 xsm:w-16 text-white rounded-r-lg flex gap-2 items-center">
                <img
                  src={search}
                  className="h-[24px] w-[24px] xsm:w-[30px] xsm:h-[30px]"
                  alt="search icon"
                />
                <span className="xsm:hidden">Search</span>
              </button>
            </Link>
          </div>
          <h4
            className="text-[17px] text-[#464F54] font-semibold"
            data-aos="fade-right"
          >
            <span className="font-bold text-Primary">Popular:</span>
            {" "}Clothing Brands, Shoes Brands, Perfumes Brands ...
          </h4>
        </div>
        <img
          className="hidden lg:block w-2/6"
          src={brandsIcon}
          alt="brands-icon"
        />
      </div>
    </div>
  );
}
