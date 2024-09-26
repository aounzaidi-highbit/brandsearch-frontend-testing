import React from 'react';
import google from "../../assets/images/google.png";
import { Link } from 'react-router-dom';

const UserLog = () => {
  return (
    <div className="container flex justify-center xsm:w-full w-[80vw] xsm:mt-20 items-center h-80 lg:h-[450px] rounded-3xl bg-[#e7f1f7] text-[black] mb-32">
      <div className="flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-xl lg:text-3xl xl:text-[40px] font-bold">Help Others Make the Best Choice</h1>
          <p className="lg:text-lg 2xl:text-xl w-[85%] xsm:my-6 my-10 mx-auto" >Join us and share your experiences! Log in to add your reviews and help others make the best choices when it comes to clothing and accessories. Your feedback makes a difference!</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="border-r border-gray-500">
            <Link to={'/signin'} onClick={() => window.scrollTo(0, 0)}>
              <button className="bg-[#cccccc] text-black font-bold text-[14px] lg:text-md 2xl:text-xl rounded-full py-3 px-4 lg:py-3 lg:px-5 mr-5">Login Or Sign Up</button>
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