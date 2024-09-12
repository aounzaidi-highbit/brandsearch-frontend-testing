import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import search from "../../assets/images/search-list.png";
import OurListed from "../Home/OurListed";
import { getAllProfiles, getRatingDetails } from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default-brand.png";
import linkIcon from "../../assets/images/link-icon.png";
import fullStar from "../../assets/images/full-star.png";
import halfStarImage from "../../assets/images/half-star.png";
import blankStar from "../../assets/images/blank-star.png";
import Loader from "../../components/Loader/loader";
import NoData from "../../components/noData/noData";

export default function BusinessList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const category = queryParams.get("category");
  const [text, setText] = useState(name || "");
  const [value] = useDebounce(text, 100);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [total, setTotal] = useState(0);
  const [ratings, setRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(event.selected);
    setLoading(true);
  };

  const getProfile = async () => {
    setupAxios();
    try {
      setLoading(true);
      if (value) {
        const res = await getAllProfiles(category, 1, total, value);
        const filteredProfiles = res?.data?.results?.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setProfile(filteredProfiles || []);
        setIsSearchMode(true);
      } else {
        const res = await getAllProfiles(category, currentPage + 1, 10);
        setProfile(res?.data?.results || []);
        setTotal(res?.data?.count);
        setIsSearchMode(false);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const ensureProtocol = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  };

  useEffect(() => {
    getProfile();
  }, [category, value, currentPage]);

  const fetchRatings = async () => {
    try {
      const ratingsData = await Promise.all(profile.map(async (item) => {
        const data = await getRatingDetails(item.id);
        return { id: item.id, averageRating: data.average_rating || 0, totalReviews: data.rating_count || 0 };
      }));

      const ratingsMap = {};
      ratingsData.forEach((item) => {
        ratingsMap[item.id] = {
          averageRating: item.averageRating,
          totalReviews: item.totalReviews,
        };
      });

      setRatings(ratingsMap);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };


  useEffect(() => {
    if (profile.length > 0) {
      fetchRatings();
    }
  }, [profile]);

  const renderStars = (rating) => {
    const fullStarsCount = Math.floor(rating);
    const halfStarNeeded = rating % 1 !== 0;
    const emptyStarsCount = 5 - fullStarsCount - (halfStarNeeded ? 1 : 0);
    const fullStars = Array(fullStarsCount).fill(<img src={fullStar} alt="full-star" className="w-4" />);
    const halfStar = halfStarNeeded ? <img src={halfStarImage} alt="half-star" className="w-4" /> : null;
    const emptyStars = Array(emptyStarsCount).fill(<img src={blankStar} alt="empty-star" className="w-4" />);
    return [...fullStars, halfStar, ...emptyStars];
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-center items-center my-10 lg:my-16">
          <h2 className="text-[#000000] text-center">
            <span className="text-xl lg:text-2xl block font-bold mb-1">All Brands</span>
            <span className="text-2xl lg:text-4xl font-light relative">
              <span className="gradient font-black">Top </span> Brand in one place
              <img className="flex justify-end absolute right-0 -bottom-5 h-[28px]" src={Vector} alt="arrow" />
            </span>
          </h2>
        </div>

        <div className="relative mb-10">
          <div className="absolute top-3 left-5">
            <img src={search} alt="search" className="cursor-pointer" />
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="py-4 pl-28 pr-6 text-[#464F54] w-full border-2 border-[#287BB7] rounded-[10px] placeholder:text-[#464F54] box-shadow2 focus:outline-none placeholder-gray-500"
            placeholder="Cloths Brands"
          />
        </div>
        <div className="">
          <div className="max-w-5xl m-auto">
            {
              loading ? (
                <Loader />
              ) : profile.length === 0 ? (
                <NoData />
              ) : (
                profile?.map((item) => {
                  const displayDomain = item.website.replace(/^https?:\/\//, '').replace(/^www\./, '');
                  const websiteURL = ensureProtocol(item.website);
                  return (
                    <div key={item.id} className="xsm:text-sm flex flex-col md:flex-row justify-between items-center py-2 rounded-xl mb-6 px-4 shadow-box-shadow sm:min-h-[220px] md:min-h-[180px]">
                      <div className="flex items-center xsm:flex-col">
                        <div className="flex-shrink-0 mx-auto w-[108px] h-[108px]">
                          <img
                            src={item?.logo || defaultImg}
                            className="rounded-full w-[108px] h-[108px] flex items-center"
                            loading="lazy"
                            onError={(e) => { e.target.src = defaultImg; }}
                          />

                        </div>
                        <div className="px-2 xsm:px-0 w-[85%] mx-auto xsm:flex xsm:flex-col">
                          <h2 className="xsm:text-[18px] xsm:text-center md:text-xl font-normal xsm:mt-2">
                            <Link to={`/business-details/${item.id}`} className="font-bold hover:text-[#3e7eab]">{capitalizeWords(item?.name)}</Link>
                          </h2>
                          <div className="my-2">
                            <div className="flex xsm:flex-col xsm:items-start items-center gap-1">
                              <div className="flex mb-1">{renderStars(ratings[item.id]?.averageRating || 0)}
                              </div>
                              <h6 className="font-normal text-[#8D8D8D] xsm:flex">
                                <span className="font-bold text-black">
                                  {(ratings[item.id]?.averageRating ? parseFloat(ratings[item.id]?.averageRating).toFixed(1) : "0.0")}
                                </span>{" "}
                                ({`${ratings[item.id]?.totalReviews || "0"} Reviews`})
                              </h6>
                            </div>
                            <div>
                              <a href={websiteURL} className="flex items-center" target="_blank" rel="noopener noreferrer">
                                <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                                <span className="text-md mx-1 text-[#287BB7] hover:text-[#4ea0db]">{displayDomain}</span>
                              </a>
                            </div>
                          </div>
                          <p className="">
                            {item.description?.length > 170 ? (
                              <div className="">
                                {item.description.substring(0, 170)}
                                <Link to={`/business-details/${item.id}`} className="text-[#287BB7] hover:text-[#4ea0db]">...read more</Link>
                              </div>
                            ) : (
                              item.description
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mx-auto justify-center h-full w-full md:w-[150px]">
                        <Link to={`/business-details/${item.id}`} className="text-white bg-[#287BB7] text-lg px-10 rounded-lg py-3 hover:bg-[#4ea0db] flex items-center justify-center w-full md:w-[150px] my-2 "><button className="">View</button></Link>
                      </div>
                    </div>
                  );
                })
              )
            }
          </div>
        </div>

        <div className="my-5 xsm:my-20">
          {total > 0 && (
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
        <OurListed />
      </div>
    </>
  );
}
