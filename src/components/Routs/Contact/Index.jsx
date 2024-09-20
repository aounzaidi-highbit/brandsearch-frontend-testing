import React from "react";
import postIMG from "../../assets/images/post-image.svg";

const Contact = () => {
  return (
    <div>
      <div className="bg-contact-image bg-cover bg-no-repeat bg-center lg:h-[513px] -mt-24 lg:-mt-24">
        <div className="container mx-auto pt-10">
          <div className="grid lg:grid-cols-2 gap-6 place-items-center">
            <div className="">
              <h2 className="mb-4 pt-20 lg:pt-0">
                <span className="text-6xl lg:text-7xl font-normal ">
                  <span className="gradient font-extrabold">Contact </span> Us
                </span>
              </h2>
              <p className="text-[#464F54] lg:text-xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="pt-10">
              <img src={postIMG} alt="post Image" className="lg:h-[433px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="box-shadow p-4 lg:p-10 my-20">
          <form className="">
            <div className="grid lg:grid-cols-2 gap-6 lg:mb-0 mb-4">
              <div className="w-full ">
                <label
                  className="block capital text-[#000] text-[15px] mb-2"
                  for="your-name"
                >
                  Your Name
                </label>
                <input
                  className="appearance-none box-shadow block w-full bg-transparent text-[#000] border border-[#FF8B49] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white"
                  id="your-name"
                  type="text"
                />
              </div>
              <div className="w-full">
                <label
                  className="block capital text-[#000] text-[15px] mb-2"
                  for="your-email"
                >
                  Your Email
                </label>
                <input
                  className="appearance-none block w-full bg-transparent text-black box-shadow
                  border border-[#FF8B49] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white "
                  id="your-email"
                  type="email"
                />
              </div>
              <div className="w-full mb-6">
                <label
                  className="block capital text-[#000] text-[15px] mb-2"
                  for="your-email"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none block w-full bg-transparent text-black box-shadow
                  border border-[#FF8B49] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white "
                  id="your-email"
                  type="number"
                />
              </div>
              <div className="w-full  mb-6">
                <label
                  className="block capital text-[#000] text-[15px] mb-2"
                  for="your-email"
                >
                  Subject
                </label>
                <input
                  className="appearance-none block w-full bg-transparent text-black box-shadow
                  border border-[#FF8B49] rounded-[1px] p-4 -tight focus:outline-none focus:bg-white "
                  id="your-email"
                  type="text"
                />
              </div>
            </div>
            <div className="lg:mb-6 mb-10">
              <label
                for="message"
                className="block capital text-[#000] text-[15px] mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="appearance-none block w-full bg-transparent text-black box-shadow
                border border-[#FF8B49] rounded-[1px] p-4 leading-tight focus:outline-none focus:bg-white "
                placeholder=""
              ></textarea>
            </div>
            <button className="gradient2 text-xl lg:text-2xl font-bold p-3 rounded-md text-white">
              Send Message
            </button>
          </form>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          <div className="box-shadow2 p-10 rounded-[10px]">
            <h3 className="text-xl lg:text-2xl font-light mb-1">
              Address <span className="gradient font-bold">info: </span>
            </h3>
            <p className="text-[#9B9B9B]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="box-shadow2 p-10 rounded-[10px]">
            <h3 className="text-xl lg:text-2xl font-light mb-1">
              Call <span className="gradient font-bold">Us: </span>
            </h3>
            <p className="mb-1 text-[15px]">Customer Care</p>
            <p className="gradient text-[15px]">+92 4775 56457 7 78</p>
          </div>
          <div className="box-shadow2 p-10 rounded-[10px]">
            <h3 className="text-xl lg:text-2xl font-light mb-1">
              Drop a <span className="gradient font-bold">Mail: </span>
            </h3>
            <p className="mb-1 text-[15px]">
              Drop mail we will Contact You Within 24 hour's
            </p>
            <p className="gradient text-[15px]">info@Searchengine.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact