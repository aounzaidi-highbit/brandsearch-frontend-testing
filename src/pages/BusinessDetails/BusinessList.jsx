import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import search from "../../assets/images/search-list.png";
import OurListed from "../Home/OurListed";
import { getAllProfiles, getRatingDetails, getSearchProfile } from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default-brand.png";
import linkIcon from "../../assets/images/link-icon.png";
import star from "../../assets/images/star.png";
import NoData from "../../components/noData/noData";
import { capitalizeWords, ensureProtocol, handleBrandClick, renderStars } from "../../utils/helper";
import filter from "../../assets/images/filter.png";
import locationImg from "../../assets/images/location.png";
import Loader from "../../components/Loader/loader";

const BusinessList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const category = queryParams.get("category");
  const rating = queryParams.get("rating");
  const [text, setText] = useState(name || "");
  const [value] = useDebounce(text, 300);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [ratings, setRatings] = useState({});
  const [isCatOpen, setIsCatOpen] = useState(false);
  const itemsPerPage = 10;

  const [ordering, setOrdering] = useState("");

  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(event.selected);
    setLoading(true);
  };

  const getProfile = async (page = 1, categoryFilter = null, ratingFilter = null) => {
    setupAxios();
    try {
      let profileResults = [];
      if (value) {
        const res = await getSearchProfile(value);
        profileResults = res?.data?.results || [];
        setTotal(res?.data?.count || 0);
      } else {
        const res = await getAllProfiles(categoryFilter, page, itemsPerPage, "", ratingFilter, ordering);
        profileResults = res?.data?.results || [];
        setTotal(res?.data?.count || 0);
      }
      setProfile(profileResults);

      const ratingsData = await Promise.all(
        profileResults.map(async (item) => {
          const data = await getRatingDetails(item.id);
          return { id: item.id, averageRating: data.average_rating || 0, totalReviews: data.rating_count || 0 };
        })
      );

      const ratingsMap = {};
      ratingsData.forEach((item) => {
        ratingsMap[item.id] = {
          averageRating: item.averageRating,
          totalReviews: item.totalReviews,
        };
      });
      setRatings(ratingsMap);
    } catch (error) {
      console.error("Error fetching profiles or ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile(currentPage + 1, category, rating);
  }, [category, value, rating, currentPage, ordering]);

  const handleRatingClick = (rating) => {
    const currentPage = 1;
    const queryParams = new URLSearchParams(location.search);

    if (category && category !== 'null') {
      queryParams.set('category', category);
    }

    if (rating) {
      queryParams.set('rating', rating);
    } else {
      queryParams.delete('rating');
    }

    const queryString = queryParams.toString();
    navigate(`/business-list?${queryString}`);
    getProfile(currentPage, category !== 'null' ? category : undefined, rating);
  };

  return (
    <>
      {/* <div className="w-11/12 xl:w-10/12 2xl:w-8/12 mx-auto sm:bg-green-600 md:bg-yellow-600 lg:bg-blue-600 xl:bg-cyan-600 2xl:bg-fuchsia-600"> */}
      <div className="w-11/12 xl:w-10/12 2xl:w-8/12 mx-auto">
        <div className=" mt-16">
          <div className="flex justify-center items-center">
            <h2 className="text-[#000000] text-center">
              <span className="text-xl lg:text-2xl block font-bold mb-1">All Brands</span>
              <span className="text-2xl lg:text-4xl font-light relative">
                <span className="gradient font-black">Top </span> Brand in one place
                <img className="flex justify-end absolute right-0 -bottom-5 h-[28px]" src={Vector} alt="arrow" />
              </span>
            </h2>
          </div>
          <div className="relative mt-10">
            <div className="absolute top-4 left-5">
              <img src={search} alt="search" className="cursor-pointer" />
            </div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className=" py-4 pl-20 text-lg shadow-box-shadow text-[15px] focus:outline-none font-medium text-[#464F54] rounded-full px-4 bg-white w-full border"
              placeholder="Cloths Brands"
            />
          </div>
          <div className="border p-2 rounded-lg my-10 lg:hidden">
            <div className="flex justify-around">
              <img src={filter} alt="filter-image" className="w-8 rounded-lg" />
              <div className="flex items-center gap-1">
                <span className="font-semibold">Filter By:</span> Rating
                <img src={star} alt="star-image" className="w-7" />
                <select
                  className="cursor-pointer rounded-lg p-1 outline-0 border focus:ring-0 focus:border-gray-400"
                  onChange={(e) => handleRatingClick(e.target.value)}>
                  <option value="">All</option>
                  <option value={3.0}>3.0+</option>
                  <option value={4.0}>4.0+</option>
                  <option value={4.5}>4.5+</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                Average Rating
                <img src={star} alt="star-image" className="w-7" />
                <select
                  className="cursor-pointer rounded-lg p-1 outline-0 border focus:ring-0 focus:border-gray-400"
                  onChange={(e) => setOrdering(e.target.value)}>
                  <option>Choose to Sort</option>
                  <option value={"high-to-low"}>Highest to lowest</option>
                  <option value={"low-to-high"}>Lowest to highest</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                Number of Reviews
                <img src={star} alt="star-image" className="w-7" />
                <select
                  className="cursor-pointer rounded-lg p-1 outline-0 border focus:ring-0 focus:border-gray-400"
                  onChange={(e) => setOrdering(e.target.value)}>
                  <option>Choose to Sort</option>
                  <option value={"most-reviews"}>Highest Reviews</option>
                  <option value={"least-reviews"}>Lowest Reviews</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                Location
                <img src={locationImg} alt="star-image" className="w-8" />
                <select
                  className="cursor-pointer rounded-lg p-1 outline-0 border focus:ring-0 focus:border-gray-400">
                  <option>Pakistan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-10">
          <div className="rounded-lg px-3 shadow-box-shadow bg-white h-3/5 w-2/6 hidden lg:block">
            <div className="flex justify-between items-center my-5">
              <p className="text-[20px]">Filter By</p>
              <p className="text-[15px] underline cursor-pointer hover:text-blue-500"
                onClick={() => {
                  handleRatingClick("")
                  setOrdering("")
                }}>Reset All</p>
            </div>
            <p className="text-[15px]">Rating</p>
            <div className="flex gap-1 my-5">
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => handleRatingClick("")}>All</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => handleRatingClick(3.0)}><img src={star} alt="star-image" className="w-6" />3.0+</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => handleRatingClick(4.0)}><img src={star} alt="star-image" className="w-6" />4.0+</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => handleRatingClick(4.5)}><img src={star} alt="star-image" className="w-6" />4.5+</button>
            </div>
            <p className="text-[15px]">Location</p>
            <div className="flex gap-1 my-2">
              <select name="" id="" className="w-full border p-2 rounded-lg bg-white">
                <option value="PK" className="border">Pakistan</option>
              </select>
            </div>
            <p className="text-[20px] mt-5">Sort By</p>
            <div className="gap-1 my-5">
              <p className="text-[15px]">Rating</p>
              <div className="flex gap-1 my-2">
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => setOrdering("high-to-low")}>Highest to lowest</button>
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => setOrdering("low-to-high")}>Lowest to highest</button>
              </div>
            </div>
            <div className="gap-1 my-5">
              <p className="text-[15px]">Number of Reviews</p>
              <div className="flex gap-1 my-2">
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => setOrdering("most-reviews")}>Highest reviews</button>
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:shadow-box-shadow" onClick={() => setOrdering("least-reviews")}>Lowest reviews</button>
              </div>
            </div>

          </div>
          <div className="min-h-[90vh] w-5/6">
            {loading ? (
              <Loader />
            ) : profile.length === 0 ? (
              <NoData />
            ) : (
              profile.map((item) => {
                const websiteURL = ensureProtocol(item.website);
                return (
                  <div key={item.id} className="xsm:text-sm py-5 flex flex-col md:flex-row justify-between items-center rounded-xl mb-6 px-5 shadow-box-shadow sm:min-h-[220px] md:min-h-[180px] bg-white">
                    <div className="flex items-center xsm:flex-col w-full">
                      <div className="flex-shrink-0 mx-auto w-[108px] h-[108px]">
                        <img
                          src={item?.logo || defaultImg}
                          className="rounded-full w-[108px] h-[108px] flex items-center border"
                          loading="lazy"
                          onError={(e) => { e.target.src = defaultImg; }}
                        />
                      </div>
                      <div className="px-5 xsm:px-0 w-[85%] mx-auto xsm:flex xsm:flex-col">
                        <h2 className="xsm:text-[18px] xsm:text-center md:text-xl font-normal xsm:mt-2">
                          <a onClick={() => handleBrandClick(item.name, item.id, navigate)} className="cursor-pointer font-bold hover:text-[#3e7eab]">
                            {capitalizeWords(item?.name)}
                          </a>
                        </h2>
                        <div className="my-2">
                          <div className="flex xsm:flex-col xsm:items-start items-center gap-1">
                            <div className="flex mb-1">{renderStars(ratings[item.id]?.averageRating || 0)}</div>
                            <h6 className="font-normal text-[#8D8D8D] xsm:flex">
                              <span className="font-bold text-black">
                                {ratings[item.id]?.averageRating ? parseFloat(ratings[item.id]?.averageRating).toFixed(1) : "0.0"}
                              </span>{" "}
                              ({`${ratings[item.id]?.totalReviews || "0"} Reviews`})
                            </h6>
                          </div>
                          <div>
                            <a href={websiteURL} className="flex items-center" target="_blank" rel="noopener noreferrer">
                              <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                              <span className="text-md mx-1 text-[#287BB7] hover:text-[#4ea0db]">{item.website}</span>
                            </a>
                          </div>
                        </div>
                        <p className="">
                          {item.description?.length > 100 ? (
                            <div className="">
                              {item.description.substring(0, 100)}
                              <button onClick={() => handleBrandClick(item.name, item.id, navigate)} className="text-[#287BB7] hover:text-[#4ea0db]">...read more</button>
                            </div>
                          ) : (
                            item.description
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mx-auto justify-center h-full  md:w-[150px]">
                      <button onClick={() => handleBrandClick(item.name, item.id, navigate)}
                        className="text-white bg-[#287BB7] text-lg rounded-3xl hover:bg-[#4ea0db] flex items-center justify-center px-8 py-3 my-2 ">
                        View
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            <div className="">
              {total >= 9 && (
                <ReactPaginate
                  className="flex m-auto justify-center"
                  activeClassName="bg-[#287BB7] !text-white"
                  breakClassName="item-black border cursor-default"
                  breakLabel={<span className="pointer-events-none">{" _ " + " _ " + " _ "}</span>}
                  containerClassName="pagination bg-gray-100"
                  marginPagesDisplayed={1}
                  nextClassName="item next larger-text"
                  nextLabel={<span style={{ backgroundColor: '#287BB7', color: 'white', padding: '10px 20px' }}>Next</span>}
                  previousClassName="item previous"
                  previousLabel={<span style={{ backgroundColor: '#287BB7', color: 'white', padding: '10px 20px' }}>Previous</span>}
                  forcePage={currentPage}
                  onPageChange={handlePageClick}
                  pageCount={Math.ceil(total / 10)}
                  pageLinkClassName="w-full h-full flex items-center justify-center"
                  pageClassName="item pagination-page border text-gray-900"
                  pageRangeDisplayed={3}
                />
              )}
            </div>
          </div>
        </div>
        <OurListed />
      </div >
    </>
  );
};

export default BusinessList;