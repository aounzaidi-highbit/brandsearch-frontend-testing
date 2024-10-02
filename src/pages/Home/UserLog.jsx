import React from 'react';
import google from "../../assets/images/google.png";
import { Link } from 'react-router-dom';

const UserLog = () => {
  return (
    <div className="flex justify-center items-center rounded-3xl bg-[#e7f1f7] text-[black] p-20 xl:m-32 m-20 xl:p-32 xsm:mx-0 xsm:p-10 xsm:rounded-none">
      <div className="flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold">Help Others Make the Best Choice</h1>
          <p className="lg:text-lg 2xl:text-xl xsm:my-6 my-10 mx-auto" >Join us and share your experiences! Log in to add your reviews and help others make the best choices when it comes to clothing and accessories. Your feedback makes a difference!</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="border-r border-gray-500">
            <Link to={'/signin'} onClick={() => window.scrollTo(0, 0)}>
              <button className="bg-[#cccccc] text-black font-semibold text-[14px] lg:text-md 2xl:text-xl rounded-lg py-3 px-4 lg:py-3 lg:px-5 mr-5">Login Or Sign Up</button>
            </Link>
          </div>
          <div className="flex gap-2 p-1 rounded-md border-[#d8d8d8] border">
            <Link to={'/signin'} onClick={() => window.scrollTo(0, 0)}>
              <img src={google} className="w-7 lg:w-10" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLog;