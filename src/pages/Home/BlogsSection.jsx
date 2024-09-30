import React from 'react';
import { Link } from "react-router-dom";

const BlogsSection = () => {
    return (
        <div className='flex xsm:flex-col sm:items-center relative sm:h-[70vh] xsm:mx-8 xsm:my-32 sm:m-20 xl:m-32'>
            <div className="xsm:p-5 bg-[#e7f1f7] flex items-center px-8 lg:px-16 py-10 2xl:p-20 sm:rounded-3xl xsm:m-0 rounded-tl-3xl rounded-tr-3xl">
                <div className="text-black">
                    <h1 className="sm:text-sm xsm:text-xl md:text-xl lg:text-2xl xl:text-[32px] font-semibold">Get in Touch with Us</h1>
                    <p className="sm:w-5/12 md:w-6/12 lg:w-2/5 2xl:w-3/6 xsm:text-[15px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[18px] my-3 sm:my-5">
                        Have questions, feedback, or need assistance? We're here to help! Reach out to us anytime, and we'll get back to you as soon as possible. Your thoughts and concerns are important to us, so don’t hesitate to drop us a message!</p>
                    <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                        <button type="button" className="bg-[#d8d8d8] py-2 px-3  sm:text-[10px] text-black font-semibold rounded-full text-center md:text-[15px] lg:text-[18px]">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>
            <div className="p-5 lg:p-10 sm:absolute flex flex-col sm:gap-5 2xl:gap-8 justify-center shadow-box-shadow border-2 bg-white sm:min-h-40 md:min-h-[60vh] sm:w-2/5 2xl:w-4/12 sm:right-12 lg:right-20 xl:right-28 2xl:right-40 sm:rounded-3xl rounded-bl-3xl rounded-br-3xl">
                <h1 className=" font-semibold sm:text-sm flex lg:mt-5 flex-col lg:gap-2 lg:text-2xl xl:text-[32px] md:text-xl">
                    <span className='xsm:text-xl '>Discover Insights</span>
                    <span className='xsm:text-xl '>in Our Latest Blog Posts</span>
                </h1>
                <p className="sm:text-[10px] xsm:text-[15px] md:text-[12px] lg:text-[14px] xl:text-[18px] text-gray-700 my-3">
                    Dive into the latest trends, tips, and insights from the fashion world! Our blog features articles, reviews, and stories to keep you informed and inspired. Stay updated with fresh content and discover new perspectives on clothing and accessories.                    </p>
                <button type="button" className="bg-[#d8d8d8] py-2 px-5 text-black font-semibold mx-auto xl:w-2/6 rounded-full md:py-2 md:px-3 lg:px-6 lg:py-3 text-center text-[15px] lg:text-[18px]">
                    Blogs
                </button>
            </div>
        </div>
    );
};

export default BlogsSection;