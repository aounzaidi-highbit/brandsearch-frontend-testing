import React, { useEffect, useRef, useState } from "react";
import world from "../../assets/images/world.png";
import reviewIcon from "../../assets/images/review-icon.png";
import calander from "../../assets/images/calander.png";
import linkIcon from "../../assets/images/link-icon.png";
import fullStar from "../../assets/images/full-star.png";
import blankStar from "../../assets/images/blank-star.png";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import OurListed from "../Home/OurListed";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSingleProfiles, getRatingDetails } from "../../services/business";
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultImg from "../../assets/images/default-brand.png";
import { Navigation } from 'swiper/modules';
import locationIcon from "../../assets/images/location.png";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddReview from "./AddReview";
import { SignIn } from "../SignIn";
import copyIcon from '../../assets/images/copy.png';
import tickIcon from "../../assets/images/tick.png";
import { capitalizeWords, formatDate, getInitials, renderStars } from "../../utils/helper";

export default function BusinessDetails() {
  const { name } = useParams();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allReview, setAllReview] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState({});
  const reviewsPerPage = 10;
  const [reviews, setReviews] = useState([]);
  const [icon, setIcon] = useState(copyIcon);
  const [buttonText, setButtonText] = useState("Share");
  const [averageRating, setAverageRating] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const { id } = location.state;
  const { brandName } = useParams(); // Extract the brand name from the URL

  const stars = [
    { rating: 5, starsFilled: 5 },
    { rating: 4, starsFilled: 4 },
    { rating: 3, starsFilled: 3 },
    { rating: 2, starsFilled: 2 },
    { rating: 1, starsFilled: 1 },
  ];

  useEffect(() => {
    const { id } = location.state;
    if (!id) {
      console.log("id not found! value of id is = " + id);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileResponse = await getSingleProfiles(id);
        setProfile(profileResponse.data);

        const ratingDetailsResponse = await getRatingDetails(id);
        const { average_rating, rating_count, ratings } = ratingDetailsResponse;
        setAverageRating(average_rating);
        setTotalReviews(rating_count);

        const ratingCount = ratings.reduce((acc, review) => {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
          return acc;
        }, {});

        const percentages = {};
        for (let i = 1; i <= 5; i++) {
          percentages[i] = (ratingCount[i] || 0) / rating_count * 100;
        }
        setRatingPercentages(percentages);

        setAllReview(ratings);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setTimeout(() => {
          setShowContent(true);
          setLoading(false)
        }, 10);
      }
    };

    fetchProfile();
  }, [location.state]);

  useEffect(() => {
    // Scroll to the review when the page loads
    if (location.hash) {
      const reviewId = location.hash.replace('#review-', ''); // Extract review ID from hash
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.scrollIntoView({ behavior: 'smooth' });
      }
      alert("hashed id = " + reviewId)
    }
  }, [location.hash]);

  useEffect(() => {
    const fetchProfileByName = async () => {
      try {
        if (!location.state?.id) {
          const response = await getSingleProfiles(name);
          const brandProfile = response.data;
          setProfile(brandProfile);
          setReviews(brandProfile.id);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!location.state?.id) {
      fetchProfileByName();
    }
  }, [name]);

  const handleShareClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setButtonText('Link Copied');
        setIcon(tickIcon);

        setTimeout(() => {
          setButtonText('Share');
          setIcon(copyIcon);
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      setButtonText('Link Copied');
      setIcon(tickIcon);
      setTimeout(() => {
        setButtonText('Share');
        setIcon(copyIcon);
      }, 3000);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReview.slice(indexOfFirstReview, indexOfLastReview);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const totalPages = Math.ceil(allReview.length / reviewsPerPage);
  const [ratingPercentages, setRatingPercentages] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);

  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalReviews = reviews.length;

      const ratingCounts = reviews.reduce((acc, review) => {
        if (review.rating) {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
        } else {
          console.warn("Review without rating found:", review);
        }
        return acc;
      }, {});

      const ratingPercentages = {
        5: ((ratingCounts[5] || 0) / totalReviews) * 100,
        4: ((ratingCounts[4] || 0) / totalReviews) * 100,
        3: ((ratingCounts[3] || 0) / totalReviews) * 100,
        2: ((ratingCounts[2] || 0) / totalReviews) * 100,
        1: ((ratingCounts[1] || 0) / totalReviews) * 100,
      };

      setRatingPercentages(ratingPercentages);
    } else {
      console.log("No reviews found.");
    }
  }, [reviews]);

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

  const [slidesPerView, setSlidesPerView] = useState(1);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 500) {
      setSlidesPerView(1.2);
    } else if (width < 640) {
      setSlidesPerView(1.75);
    } else if (width < 1024) {
      setSlidesPerView(2);
    } else
      setSlidesPerView(2.5);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  const modifyWebsiteUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  };

  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReadMore = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  if (!showContent) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-white'></div>
    );
  }

  return (
    <>
      <div className="mt-28">
        < div className="mx-auto flex flex-col justify-between items-center gap-4 my-10 lg:mb-10 lg:mt-20 p-4 lg:py-8 rounded-[10px] xsm:w-[100%] w-[70%] bg-[#e7f1f7]" >
          <div className="-mt-28">
            <img src={profile.logo || defaultImg} onError={(e) => { e.target.src = defaultImg }} alt="image" className="bg-white w-[120px] md:w-[150px] h-[120px] rounded-full md:h-[150px] border-4 border-[#287BB7]" />
          </div>
          <h2 className="text-[25px] md:text-[28px]">
            <span className="font-bold gradient"> {profile?.name}</span>
          </h2>
          <p className="lg:w-[70%] md:w-[65%] w-[90%] text-center">{profile?.description}</p>
          <h6 className="text-[18px] font-bold gradient flex items-center">
            <img src={locationIcon} alt="location-icon" />
            <span> Pakistan {profile.country} </span>
          </h6>
          <div className="flex flex-col items-center my-5 md:flex-row justify-center gap-5 md:gap-14 lg:justify-center lg:gap-48 w-full">
            <div className="items-center xsm:text-center">
              <div className="items-center">
                <div className="flex">
                  <span className="bg-[#287BB7] font-bold text-white rounded-lg flex items-center text-xl px-2 mr-1">{averageRating.toFixed(1) || "0"}</span>
                  <div>
                    <div className="flex justify-center mb-1">{renderStars(averageRating)}</div>
                    <h6 className="font-normal text-[#8D8D8D]">
                      <div> ({`${totalReviews} Reviews` || "0 Reviews"})</div>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <a target={profile.website} href={modifyWebsiteUrl(profile.website)}>
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center">
                  <img src={world} alt="world" className="w-8 lg:w-10 ml-1" />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-[15px] font-light leading-5">
                    Live <span className="font-bold gradient"> Site </span>
                  </h2>
                  <p className="text-[#666666]">{profile.website}</p>
                </div>
              </div>
            </a>
          </div>
          <div className="flex gap-5 md:gap-8 lg:gap-36">
            <div>
              <span className="flex flex-col sm:text-lg md:text-lg lg:text-xl font-light relative items-center">
                <img src={facebook} alt="brand-icon" className="mb-4 w-[50px] rounded-full h-[50px]" />
                <span><span className="gradient font-black">Facebook </span>Followers</span>
                <Link to={profile.facebook} className="flex items-center" target="_blank">
                  <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                  <span className="xsm:text-center text-[12px] sm:text-center mx-1 md:mx-0 text text-[#287BB7] hover:text-[#4ea0db] font-bold pl-1">Visit <span className="xsm:hidden">Brand's</span> Facebook Page</span>
                </Link>
              </span>
              <div className="flex justify-center items-center flex-col py-2 md:py-4">
                <h2 className="gradient font-black text-xl  lg:text-4xl">
                  {profile?.facebook_followers}+
                </h2>
              </div>
            </div>

            <div>
              <span className="flex flex-col sm:text-lg md:text-lg lg:text-xl font-light relative items-center">
                <img src={instagram} alt="brand-icon" className="mb-4 w-[50px] rounded-full h-[50px]" />

                <span><span className="gradient font-black">Instagram </span>Followers</span>
                <Link to={profile.insta} className="flex items-center" target="_blank">
                  <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                  <span className="xsm:text-center text-[12px] sm:text-center mx-1 md:mx-0 text text-[#287BB7] hover:text-[#4ea0db] font-bold pl-1">Visit <span className="xsm:hidden">Brand's</span> Instagram Account</span>
                </Link>
              </span>
              <div className="flex justify-center items-center flex-col py-2 md:py-4">
                <h2 className="gradient font-black text-xl  lg:text-4xl">
                  {profile?.insta_followers}+
                </h2>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 w-full">
            <button className=" flex items-center justify-center border bg-[#287BB7] w-[50%] lg:w-[30%] 2xl:w-[20%] h-16 p-6 rounded-[10px]"
              onClick={() => document.getElementById('dropReview').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex gap-1 md:gap-4 w-[100%] items-center">
                <img src={reviewIcon} alt="review-icon" className="w-12 filter invert" />
                <span className="text-white lg:font-bold text-sm lg:text-[18px]">
                  Write Review
                </span>
              </span>
            </button>
            <button className=" flex items-center justify-center border border-[#287BB7] w-[50%] lg:w-[30%] 2xl:w-[20%] h-16 p-6 rounded-[10px] bg-white"
              onClick={handleShareClick}>
              <span className="flex items-center gap-1 md:gap-4 ">
                <img src={icon} alt="save" className="w-7 lg:w-8" />
                <span className="text-[#287BB7] font-bold lg:text-lg">
                  {buttonText}
                </span>
              </span>
            </button>
          </div>
        </div >
      </div>

      {currentReviews.length > 2 ?

        (<div className="container mb-72 xsm:mb-40">

          <div className=" flex w-full h-[50vh] my-20 md:my-40 ">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-normal xsm:text-center xsm:ml-[25%] absolute text-white mt-3 xl:mt-52 ml-10">
              <span className="font-bold "> Recommended </span><br /> Reviews
            </h2>

            <div className="xsm:w-full xsm:h-[60vh] w-[50%] 2xl:h-[55vh] h-[65vh] lg:w-[35%] rounded-3xl bg-[#287BB7]"></div>
            <div className="mt-8 xsm:mt-20 2xl:mt-20 ml-20 lg:ml-52 xsm:ml-10 xl:ml-80 w-[70%] lg:w-[70%] xl:w-[65%] absolute bg-transparent">
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={slidesPerView}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="multiple-slide-carousel swiper-container relative"
              >
                {currentReviews.slice(0, 5).map((review, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    {console.log("data in reveiw = " + JSON.stringify(review))}
                    <div className="bg-white shadow-box-shadow border-4 rounded-3xl h-auto flex flex-col p-5 xsm:p-3 w-[110%] md:w-full">
                      <p className="font-semibold pl-1 text-xl">{review.rating_title}</p>
                      <div
                        className={`p-1 xsm:text-sm text-[#747474] h-60 ${review.description.length > 250 ? "overflow-y-scroll" : "overflow-y-auto"
                          }`}
                      >
                        {review.description}
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="border-2 rounded-full w-14 h-14 flex justify-center items-center text-xl border-[#287BB7]">
                          {getInitials(review.user.first_name + " " + review.user.last_name || "Anonymous")}
                        </div>
                        <div className="flex flex-col lg:text-lg font-bold">
                          <p>{capitalizeWords(review.user.first_name + " " + review.user.last_name || "Anonymous")}</p>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>) : (<></>)}

      <div className="bg-[#f3f8fb] rounded-lg pt-32">
        <div className="p-4">
          <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center">
            <div className=" text-center lg:text-left justify-center items-center lg:w-[45%] px-4">
              <div className="">
                <h2 className="xsm:text-2xl text-4xl font-normal">
                  <span className="font-bold gradient"> Over All </span> Rating
                </h2>
                <div className="flex justify-center lg:justify-start items-center gap-2">
                  <span className="text-[#737072] text-2xl font-bold">
                    {averageRating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {renderStars(averageRating)}
                  </div>
                </div>
              </div>
              <h6 className="text-[#737072] font-normal text-xl lg:text-2xl mb-3">
                {`(${totalReviews} Reviews)`}
              </h6>
              <p className="text-[#BBBBBB] xsm:text-lg text-xl">
                Here are reviews from customers of this brand. Explore them to gain insights into their experiences and feedback.
              </p>
            </div>
            <div>
              {stars.map(({ rating, starsFilled }) => (
                <div key={rating} className="xsm:text-[16px] flex xsm:gap-2 gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
                  {rating} Stars
                  <div className="flex justify-center items-center xsm:gap-2 gap-4">
                    {[...Array(starsFilled)].map((_, i) => (
                      <img key={i} src={fullStar} alt="full-star" className="xsm:w-6" />
                    ))}
                    {[...Array(5 - starsFilled)].map((_, i) => (
                      <img key={i} src={blankStar} alt="blank-star" className="xsm:w-6" />
                    ))}
                  </div>
                  ({isNaN(ratingPercentages[rating]) ? '0' : ratingPercentages[rating].toFixed(0)}%)
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="" id="showReview">
        <div className="py-20 flex-col  mx-auto px-2 rounded-2xl text-justify  bg-[#f3f8fb]">
          {currentReviews
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((review) => {
              const isExpanded = expandedReviews[review.id];
              const truncatedDescription = review.description.substring(0, 180);

              return (
                <div key={review.id} className="flex flex-col my-4 shadow-box-shadow p-4 bg-white rounded-xl w-[90%] md:w-[70%] mx-auto">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="border-2 rounded-full w-10 md:w-14 h-10 md:h-14 flex justify-center items-center text-xl md:text-2xl border-[#287BB7]">
                        {getInitials(review.user.first_name + " " + review.user.last_name || "A")}
                      </div>
                      <div className="">
                        <label className="ml-1 font-bold text-[16px] md:text-xl">
                          {capitalizeWords(review.user.first_name + " " + review.user.last_name || "Anonymous")}
                        </label>
                        <div className="flex xsm:w-3 md:gap-1 ml-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#888686] flex justify-center text-[15px] xsm:text-[12px]">
                      <img src={calander} alt="calander-icon" className="md:w-6 md:h-5 w-3 h-3 mt-[1px] mr-2" />
                      {formatDate(review.created_at)}
                    </p>
                  </div>

                  <div className="ml-1 my-2 text-sm md:text-lg text-[#888686] xsm:text-start">
                    <p className="font-semibold text-black text-xl">{review.rating_title}</p>
                    <p>
                      {isExpanded ? review.description : truncatedDescription}
                      {review.description.length > 100 && (
                        <button onClick={() => toggleReadMore(review.id)} className="text-blue-500">
                          {isExpanded ? " Read Less" : "... Read More"}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}

          <div className="pagination-controls flex justify-center mt-4">
            {currentReviews.length >= 9 && (Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-[#287BB7] text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {index + 1}
              </button>
            )))}
          </div>
        </div >

        <div className="dropReview container" id="dropReview">
          <h3 className="text-xl lg:text-3xl mt-28 mb-8">
            <span className="font-black gradient"> Drop </span>
            <span className=" font-bold" >Your Review</span>
          </h3>
          {isAuthenticated ? (
            <AddReview brandId={id} />
          ) : (
            <SignIn brandId={id} text={"To Post Review"} customStyles={{ backgroundColor: 'white', height: '75vh' }} />
          )}
        </div>
      </div >

      <OurListed />
    </>
  );
}
