import React from 'react';
import { Link } from "react-router-dom";

const BlogsSection = () => {
    return (
        <div className='container px-0'>
            <div className="relative my-60 flex justify-center w-full">
                {/* Blue Background Card */}
                <div className="bg-[#e7f1f7] xsm:rounded-tr-[40px] xsm:rounded-tl-[40px] md:rounded-[40px] xsm:rounded-bl-0 sm:h-[20vh] xsm:-mt-40 md:h-[30vh] lg:h-[50vh] 2xl:h-[45vh] xsm:top-0 xsm:px-0 p-10 flex items-center lg:mx-10">
                    <div className="text-black xsm:w-full w-[50%] px-10">
                        <h1 className="sm:text-sm md:text-xl lg:text-2xl xl:text-[32px] font-bold">Be Heard</h1>
                        <p className="my-2 md:my-2 lg:my-4 sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[18px]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>
                        <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                            <button
                                type="button"
                                className="bg-[#d8d8d8] py-1 px-2 sm:text-[10px] text-black font-bold rounded-full md:px-4 md:py-2 lg:px-6 lg:py-3 text-center md:text-[15px] lg:text-[18px]"
                            >
                                About Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="xsm:w-full xsm:left-0 flex xsm:-mb-[465px] flex-col justify-center absolute sm:top-[100px] xsm:bottom-0 md:top-[130px] sm:h-[30vh] lg:top-[170px] right-32 lg:h-[45vh] xl:h-[65vh] 2xl:h-[55vh] 2xl:top-[210px] -translate-y-1/2 shadow-box-shadow border-2 bg-white rounded-[40px] xsm:rounded-t-none w-[33%] p-10">
                    <h1 className="font-bold sm:text-sm  lg:text-2xl xl:text-[32px] md:text-xl">
                        Our 2024 <br /> Transparency Report <br /> Has Landed
                    </h1>
                    <p className="my-4 sm:text-[10px] lg:my-12 md:text-[12px] lg:text-[14px] xl:text-[18px] text-gray-700">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. dummy text of the printing and typesetting industry.
                    </p>
                    <button
                        type="button"
                        className="bg-[#d8d8d8] sm:text-sm py-1 px-2 sm:text-[10px] text-black font-bold rounded-full md:py-4 md:px-8 lg:px-6 lg:py-3 text-center text-[15px] lg:text-[18px] mx-auto"
                    >
                        Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogsSection;