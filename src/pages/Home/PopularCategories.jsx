import React, { useEffect, useState, useRef } from "react";
import Vector from "../../assets/images/vector-category.png";
import cloths from "../../assets/images/cloths.png";
import { getAllCategories } from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import Loader from "../../components/Loader/loader";
import NoData from "../../components/noData/noData";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeWords, slugify } from "../../utils/helper";

const PopularCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const getCategories = async () => {
    setupAxios();
    try {
      setLoading(false);
      const res = await getAllCategories();
      setCategory(res?.data?.results);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  // const navigate = useNavigate();
  // const handleBrandClick = (item) => {
  //   navigate(`/business-list?category=${slugify(item?.name)}`, { state: { id: item.id } });
  //   window.scrollTo(0, 0)
  // };

  return (
    <div className="h-[40vh] relative mb-60 ">
      {category?.length === 0 ? (
        setTimeout(() => {
          <NoData />;
        }, 3000)
      ) : (
        <div className="flex flex-col items-center ">
          <div className="w-full xl:h-[70vh] h-[60vh] 2xl:h-[60vh] bg-[#3d88be] shadow-box-shadow"></div>

          <div className="absolute flex justify-center items-center w-full mt-8 pt-6 "
            data-aos-delay="300"
            data-aos="zoom-in"
          >
            <h2 className="text-[#ffffff] text-center">
              <span className="text-xl lg:text-2xl block font-bold mb-1">
                Popular Categories
              </span>
              <span className="text-2xl lg:text-4xl font-semibold relative">
                <span className=" font-black"> Browse Top </span> Categories
                <img
                  className="flex justify-end absolute right-0 -bottom-5 h-[28px]"
                  src={Vector}
                  alt="arrow"
                />
              </span>
            </h2>
          </div>

          <div className="absolute max-w-[69%] mt-28 flex items-center ml-30 xsm:max-w-[90%] p-10 2xl:mt-40">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-white p-0 rounded-full w-10 text-4xl font-bold text-[#287BB7] hover:shadow-box-shadow"
              style={{ transform: "translateY(-50%)" }}
            >
              &lt;
            </button>
            <div
              ref={sliderRef}
              className="flex overflow-x-scroll scrollbar-hide gap-6 p-6 max-w-full mx-4 justify-start"
            >
              {loading ? (
                <Loader />
              ) : (
                category.map((item) => (
                  <Link
                    key={item?.id}
                    to={`/business-list?category=${item?.name}`}
                    // onClick={() => handleBrandClick(item)}

                    onClick={() => window.scrollTo(0, 0)}
                    className="rounded-md shadow-box-shadow hover:animate-grow "
                  >
                    {/* {console.log("data in category: " + JSON.stringify(category))} */}
                    <div
                      className="bg-white max-h-[200px] min-h-[200px] rounded-md flex items-center justify-center flex-col w-44"
                    >
                      <div className="flex justify-center items-center w-full h-full">
                        <img src={cloths} alt="cloths" className="mb-4" />
                      </div>
                      <div className="">
                        <h2 className="text-[16px] text-center font-bold mb-1 gradient w-full h-full flex justify-center items-center">
                          {capitalizeWords(item?.name)}
                        </h2>
                        <p className="text-[#9B9B9B] mx-auto text-center text-[15px] font-medium">
                          {item.brand_count}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-white p-0 rounded-full w-10 text-4xl font-bold text-[#287BB7] hover:shadow-box-shadow"
              style={{ transform: "translateY(-50%)" }}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default PopularCategories;
