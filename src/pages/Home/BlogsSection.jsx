import React from 'react';
import { Link } from "react-router-dom";

const BlogsSection = () => {
    return (
        <div className='container px-0'>
            <div className="relative my-60 xsm:mb-[150%] flex justify-center w-full">
                <div className="bg-[#e7f1f7] xsm:rounded-tr-[40px] xsm:rounded-tl-[40px] md:rounded-[40px] xsm:rounded-bl-0 sm:h-[20vh] xsm:-mt-40 md:h-[30vh] lg:h-[55vh] 2xl:h-[45vh] xsm:top-0 xsm:px-0 p-10 flex items-center lg:mx-10">
                    <div className="text-black xsm:w-full w-[50%] px-10">
                        <h1 className="sm:text-sm xsm:text-xl md:text-xl lg:text-2xl xl:text-[32px] font-bold">Get in Touch with Us</h1>
                        <p className="my-2 md:my-2 lg:my-4 xsm:text-[15px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[18px]">
                            Have questions, feedback, or need assistance? We're here to help! Reach out to us anytime, and we'll get back to you as soon as possible. Your thoughts and concerns are important to us, so don’t hesitate to drop us a message!</p>
                        <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                            <button
                                type="button"
                                className="bg-[#d8d8d8] xsm:py-2 xsm:px-4 py-1 px-2 sm:text-[10px] text-black font-bold rounded-full md:px-4 md:py-2 lg:px-6 lg:py-3 text-center md:text-[15px] lg:text-[18px]"
                            >
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="xsm:w-full xsm:left-0 flex xsm:-mb-[465px] flex-col justify-center absolute sm:top-[100px] xsm:top-[360px] xsm:bottom-0 md:top-[130px] sm:h-[30vh] lg:top-[150px] right-32 lg:h-[50vh] xl:h-[75vh] 2xl:h-[60vh] 2xl:top-[170px] -translate-y-1/2 shadow-box-shadow border-2 bg-white rounded-[40px] xsm:rounded-t-none w-[38%] p-10 lg:right-30">
                    <h1 className=" font-bold sm:text-sm flex lg:mt-5 flex-col gap-2 lg:text-2xl xl:text-[32px] md:text-xl">
                        <span className='xsm:text-xl '>Discover Insights</span>
                        <span className='xsm:text-xl '>in Our Latest Blog Posts</span>
                    </h1>
                    <p className="my-4 sm:text-[10px] xsm:text-[15px] lg:my-8 md:text-[12px] lg:text-[14px] xl:text-[18px] text-gray-700">
                        Dive into the latest trends, tips, and insights from the fashion world! Our blog features articles, reviews, and stories to keep you informed and inspired. Stay updated with fresh content and discover new perspectives on clothing and accessories.                    </p>
                    <button
                        type="button"
                        className="bg-[#d8d8d8] xsm:py-2 xsm:px-4 sm:text-sm py-1 px-2 sm:text-[10px] text-black font-bold rounded-full md:py-4 md:px-8 lg:px-6 lg:py-3 text-center text-[15px] lg:text-[18px] mx-auto"
                    >
                        Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogsSection;