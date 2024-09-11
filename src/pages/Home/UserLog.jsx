import React from 'react';
import google from "../../assets/images/google.png";
import { Link } from 'react-router-dom';

const UserLog = () => {
  return (
    <div className="container flex justify-center w-[80vw] xsm:mt-20 items-center h-80 lg:h-[450px] rounded-3xl bg-[#e7f1f7] text-[black] mb-32 shadow-box-shadow">
      <div className="flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-xl lg:text-3xl xl:text-[44px] font-bold">Help Millions  make the Right Choice</h1>
          <p className="lg:text-xl w-[85%] my-10 mx-auto" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. dummy text of the</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="border-r border-gray-500">
            <Link to={'/signin'} onClick={() => window.scrollTo(0, 0)}>
              <button className="bg-[#cccccc] text-black font-bold text-[14px] lg:text-xl rounded-full py-3 px-4 lg:py-3 lg:px-5 mr-5">Login Or Sign Up</button>
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