import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import search from "../../assets/images/search-list.png";
import OurListed from "../Home/OurListed";
import { getAllProfiles, getRatingDetails, getSearchProfile } from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import defaultImg from "../../assets/images/default-brand.png";
import linkIcon from "../../assets/images/link-icon.png";
import star from "../../assets/images/star.png";
import sort from "../../assets/images/sort.png";
import { capitalizeWords, ensureProtocol, handleBrandClick, renderStars } from "../../utils/helper";
import filter from "../../assets/images/filter.png";
import cross from "../../assets/images/cross.png";
import NoData from "../../components/NoData/NoData";
import { ListLoader } from "../../components/Loaders/loader";

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
  const [showFilters, setShowFilters] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
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

  const [activeRating, setActiveRating] = useState(null); // State for active rating filter
  const [activeSort, setActiveSort] = useState(null); // State for active sort option

  useEffect(() => {
    getProfile(currentPage + 1, category, rating);
  }, [category, value, rating, currentPage, ordering]);

  const handleRatingClick = (rating) => {
    setActiveRating(rating);
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
      {showFilters && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:hidden">
        <div className="bg-white py-5 px-8 rounded shadow-lg w-3/4">
          <p className="text-[20px] flex justify-between items-center">Filter By<img src={cross} alt="cross-image" onClick={() => setShowFilters(!showFilters)} className="w-4 h-4 cursor-pointer" /></p>
          <p className="text-[15px] mt-5">Rating </p>
          <div className="flex gap-1 my-5">
            <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick("")}>All</button>
            <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(3.0)}><img src={star} alt="star-image" className="w-6" />3.0+</button>
            <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(4.0)}><img src={star} alt="star-image" className="w-6" />4.0+</button>
            <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(4.5)}><img src={star} alt="star-image" className="w-6" />4.5+</button>
          </div>
          <p className="text-[15px]">Location</p>
          <div className="flex gap-1 my-2">
            <select name="" id="" className="w-full border p-2 rounded-lg bg-white">
              <option value="PK" className="border">Pakistan</option>
            </select>
          </div>
        </div>
      </div>}
      {showSorting && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:hidden">
        <div className="bg-white p-5 rounded shadow-lg w-3/4">
          <p className="text-[20px] flex justify-between items-center">Sort By<img src={cross} alt="cross-image" onClick={() => setShowSorting(!showSorting)} className="w-4 h-4 cursor-pointer" /></p>
          <div className="gap-1 my-5">
            <p className="text-[15px]">Rating</p>
            <div className="flex gap-1 my-2">
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("high-to-low")()}>Highest to lowest</button>
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("low-to-high")}>Lowest to highest</button>
            </div>
          </div>
          <div className="gap-1">
            <p className="text-[15px]">Number of Reviews</p>
            <div className="flex gap-1 my-2">
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("most-reviews")}>Highest reviews</button>
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("least-reviews")}>Lowest reviews</button>
            </div>
          </div>
        </div>
      </div>}
      <div className="w-11/12 xl:w-10/12 2xl:w-8/12 mx-auto">
        <div className="mt-16 xsm:mt-10">
          <div className="flex justify-center items-center">
            <h2 className="text-[#000000] text-center">
              <span className="text-xl lg:text-2xl block font-bold mb-1 text-Primary">All Brands</span>
              <span className="text-2xl lg:text-4xl font-light relative">
                <span className="text-Primary font-black">Top </span> Brand in one place
                <img className="flex justify-end absolute right-0 -bottom-5 h-[28px]" src={Vector} alt="arrow" />
              </span>
            </h2>
          </div>
          <div className="relative mt-10">
            <img src={search} alt="search" className="cursor-pointer absolute top-4 left-5" />
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="py-4 pl-20 text-lg shadow-box-shadow text-[15px] focus:outline-none font-medium text-[#464F54] rounded-lg px-4 bg-white w-full"
              placeholder="Cloths Brands"
            />
          </div>
          <div className="mt-5 flex lg:hidden">
            <button className="border py-2 px-3 w-full flex justify-between items-center rounded-l-lg" onClick={() => setShowFilters(!showFilters)}>Filter By<img src={filter} className="w-4" /></button>
            <button className="border py-2 px-3 w-full flex justify-between items-center rounded-r-lg" onClick={() => setShowSorting(!showSorting)}>Sort By<img src={sort} className="w-4" /></button>
          </div>
          <p className="text-right mt-2 underline hover:text-Primary cursor-pointer lg:hidden" onClick={() => {
            handleRatingClick("")
            setOrdering("")
          }}>Reset All</p>
        </div>
        <div className="flex justify-center gap-8 mt-10">
          <div className="rounded-lg px-3 shadow-box-shadow bg-white h-3/5 w-2/6 hidden lg:block">
            <div className="flex justify-between items-center my-5">
              <p className="text-[20px]">Filter By</p>
              <p className="text-[15px] underline cursor-pointer hover:text-Primary"
                onClick={() => {
                  handleRatingClick("")
                  setOrdering("")
                }}>Reset All</p>
            </div>
            <p className="text-[15px]">Rating</p>
            <div className="flex gap-1 my-5">
              <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick("")}>All</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(3.0)}><img src={star} alt="star-image" className="w-6" />3.0+</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(4.0)}><img src={star} alt="star-image" className="w-6" />4.0+</button>
              <button className="flex border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => handleRatingClick(4.5)}><img src={star} alt="star-image" className="w-6" />4.5+</button>
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
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("high-to-low")}>Highest to lowest</button>
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("low-to-high")}>Lowest to highest</button>
              </div>
            </div>
            <div className="gap-1 my-5">
              <p className="text-[15px]">Number of Reviews</p>
              <div className="flex gap-1 my-2">
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("most-reviews")}>Highest reviews</button>
                <button className="border w-full justify-center items-center p-2 rounded-lg focus:border focus:border-Primary" onClick={() => setOrdering("least-reviews")}>Lowest reviews</button>
              </div>
            </div>
          </div>
          <div className="min-h-[90vh] w-5/6">
            {loading ? (
              <ListLoader />
            ) : profile.length === 0 ? (
              <NoData />
            ) : (
              profile.map((item) => {
                const websiteURL = ensureProtocol(item.website);
                return (
                  <div key={item.id} className="xsm:text-sm py-5 flex flex-col md:flex-row justify-between items-center rounded-lg mb-6 xsm:px-0 px-5 shadow-box-shadow sm:min-h-[220px] md:min-h-[180px]">
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
                          <a onClick={() => handleBrandClick(item.name, item.id, navigate)} className="cursor-pointer font-bold hover:text-Primary">
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
                              <span className="text-md mx-1 text-Primary">{item.website}</span>
                            </a>
                          </div>
                        </div>
                        <p className="">
                          {item.description?.length > 100 ? (
                            <div className="">
                              {item.description.substring(0, 100)}
                              <button onClick={() => handleBrandClick(item.name, item.id, navigate)} className="text-Primary">...read more</button>
                            </div>
                          ) : (
                            item.description
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mx-auto justify-center h-full w-full md:w-1/6 xsm:px-5">
                      <button onClick={() => handleBrandClick(item.name, item.id, navigate)}
                        className="text-white bg-Primary w-full text-lg rounded-lg hover:bg-[#4ea0db] flex items-center justify-center px-8 py-3 my-2 ">
                        View
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            {total >= 9 && (
              <ReactPaginate
                className="flex justify-center my-10"
                activeClassName="bg-Primary !text-white"
                breakClassName="border xsm:w-20 flex justify-center pointer-events-none cursor-default"
                breakLabel={<div className="cursor-default"><span className=" sm:hidden">{" _ "}</span><span className="xsm:hidden">{" _ " + " _ " + " _ "}</span></div>}
                marginPagesDisplayed={1}
                nextClassName={currentPage === Math.ceil(total / 10) - 1 ? "hidden" : "text-white bg-Primary text-lg rounded-r-lg flex items-center border px-2"}
                nextLabel={<><div className="xsm:hidden">Next&gt;</div><div className="sm:hidden w-5 flex justify-center text-2xl">&gt;</div></>}
                previousClassName={currentPage === 0 ? "hidden" : "text-white bg-Primary text-lg rounded-l-lg flex items-center border px-2"}
                previousLabel={<><div className="xsm:hidden">&lt;Prev</div><div className="sm:hidden w-5 flex justify-center text-2xl">&lt;</div></>}
                forcePage={currentPage}
                onPageChange={handlePageClick}
                pageCount={Math.ceil(total / 10)}
                pageLinkClassName="flex items-center justify-center w-10 h-10"
                pageClassName="font-semibold border cursor-pointer flex items-center justify-center"
                pageRangeDisplayed={3}
              />
            )}
          </div>
        </div>
      </div >
      <OurListed />
    </>
  );
};

export default BusinessList;