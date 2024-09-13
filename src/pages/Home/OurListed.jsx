import React from "react";
import Vector from "../../assets/images/Vector.png";
import faiza from "../../assets/images/faiza.svg";
import mariab from "../../assets/images/mariab.svg";
import sapphire from "../../assets/images/sapphire.svg";
import clothing from "../../assets/images/clothing-brand.svg";
import agha from "../../assets/images/agha-noor.svg";
import khaadi from "../../assets/images/khaadi.svg";
import zaha from "../../assets/images/zaha.svg";
import bonanza from "../../assets/images/bonanza.svg";
import sana from "../../assets/images/sana.svg";

import Marquee from "react-fast-marquee";

export default function OurListed() {
  return (
    <div className="my-32 xsm:my-0">
      <div
        className="flex justify-center items-center"
        data-aos-delay="300"
        data-aos="zoom-in"
      >
        <h2 className="text-[#000000] text-center">
          <span className="text-xl lg:text-2xl block font-bold mb-1">
            {" "}
            Our Listed{" "}
          </span>{" "}
          <span className="text-2xl lg:text-4xl font-semibold relative ">
            <span className="gradient font-black"> 10,000 </span> Business
            listed
            <img
              className="flex justify-end absolute right-0 -bottom-5 h-[28px]"
              src={Vector}
              alt="arrow"
            />
          </span>
        </h2>
      </div>
      <div className="mt-16">
        <Marquee
          className="w-[100%]"
          // autoFill={true}
          pauseOnHover={true}
          speed={60}
          gradient={false}
        >
          <div className="flex gap-20 place-items-center">
            <div className="">
              <img src={faiza} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={mariab} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={sapphire} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={clothing} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={agha} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={khaadi} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={zaha} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={bonanza} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src={sana} alt="our listed" className="xsm:w-28" />
            </div>
            <div className="">
              <img src="" />
            </div>

          </div>
        </Marquee>
      </div>
    </div>
  );
}
