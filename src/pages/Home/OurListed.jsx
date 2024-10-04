import React from "react";
// import Vector from "../../assets/images/Vector.png";
import faiza from "../../assets/brand-logos/faiza.svg";
import mariab from "../../assets/brand-logos/mariab.svg";
import sapphire from "../../assets/brand-logos/sapphire.svg";
import clothing from "../../assets/brand-logos/clothing-brand.svg";
import agha from "../../assets/brand-logos/agha-noor.svg";
import khaadi from "../../assets/brand-logos/khaadi.svg";
import zaha from "../../assets/brand-logos/zaha.svg";
import bonanza from "../../assets/brand-logos/bonanza.svg";
import sana from "../../assets/brand-logos/sana.svg";

// import Marquee from "react-fast-marquee";

export default function OurListed() {
  return (
    <div className="my-32">
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
            <span className="text-Primary font-black"> 10,000 </span> Business
            listed
            {/* <img
              className="flex justify-end absolute right-0 -bottom-5 h-[28px]"
              src={Vector}
              alt="arrow"
            /> */}
          </span>
        </h2>
      </div>
      <div className="mt-16">
        {/* <Marquee
          className="w-[100%]"
          autoFill={true}
          pauseOnHover={true}
          speed={80}
          text-Primary={false}> */}
        <div className="flex gap-20 place-items-center">
          <img src={faiza} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={mariab} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={sapphire} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={clothing} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={agha} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={khaadi} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={zaha} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={bonanza} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src={sana} alt="our listed" className="xsm:w-28 w-32 xl:w-40" />
          <img src="" />
        </div>
        {/* </Marquee> */}
      </div>
    </div>
  );
}
