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
    <div className="bg-hero-background bg-no-repeat" data-aos="zoom-in" data-aos-delay="300">
      <div className="xl:ml-32 grid lg:grid-cols-2 place-items-center xsm:flex xsm:h-[78vh] xl:py-0 xsm:mx-10 xsm:gap-0 xsm:mb-10 gap-32">
        <div className="2xl:my-52 my-32">
          <div className="flex">
            <h2 className="text-4xl xsm:text-4xl lg:text-5xl 2xl:text-7xl mb-8 lg:mb-0 lg:w-[90%]">
              <span className="font-normal block">Explore All </span>
              <span className="font-bold gradient inline-block relative">
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
              className="box-shadow text-[15px] focus:outline-none font-medium text-[#464F54] rounded-full px-4 py-4 bg-white w-full border"
              placeholder="Find Perfect Business"
            />
            <Link
              className="absolute right-0"
              to={`/business-list?name=${name}`}
            >
              <button className="bg-[#287BB7] hover:bg-[#287BB7] text-2xl font-bold px-6 py-[14px] xsm:w-16 text-white rounded-r-full flex gap-2 items-center">
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
            <span className="font-bold text-[#000000]">Popular:</span>
            {" "}Clothing Brands, Shoes Brands, Perfumes Brands ...
          </h4>
        </div>
        <div className="">
          <img
            className=" items-center hidden lg:block xl:w-[75%]"
            src={brandsIcon}
            alt="brands icon"
          />
        </div>
      </div>
    </div>
  );
}
