import React, { useEffect, useRef, useState } from "react";
import star from "../../assets/images/star-details.svg";
import world from "../../assets/images/world.png";
import share from "../../assets/images/share.png";
import reviewIcon from "../../assets/images/review-icon.png";
import Vector from "../../assets/images/Vector.png";
import mariaProfile from "../../assets/images/maria.png";
import calander from "../../assets/images/calander.png";
import linkIcon from "../../assets/images/link-icon.png";
import fullStar from "../../assets/images/full-star.png";
import halfStarImage from "../../assets/images/half-star.png";
import worldOuter from "../../assets/images/world-outer.png";
import blankStar from "../../assets/images/blank-star.png";
import stars from "../../assets/images/stars.png";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import OurListed from "../Home/OurListed";
import { useParams } from "react-router-dom";
import { getSingleProfiles, reviewGet } from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddReview from "./AddReview";
import { SignIn } from "../SignIn";

export default function BusinessDetails() {
  const { bussiness } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allReview, setAllReview] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [highRatingReviews, setHighRatingReviews] = useState([]);
  // Add these states for pagination
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  const reviewsPerPage = 10; // Number of reviews to display per page
  const currentDate = new Date();
  const day = currentDate.getDate();
  const [reviews, setReviews] = useState([]);
  const year = currentDate.getFullYear();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  // Add this to calculate the indices for slicing the reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReview.slice(indexOfFirstReview, indexOfLastReview);
  const prevRef = useRef(null);  // Define the refs here
  const nextRef = useRef(null);
  const totalPages = Math.ceil(allReview.length / reviewsPerPage);
  const [ratingPercentages, setRatingPercentages] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const month = monthNames[currentDate.getMonth()];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    getProfile();
    getReviews();
  }, []);

  const getProfile = async () => {
    setupAxios();
    try {
      const res = await getSingleProfiles(bussiness);
      setProfile(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };
  const [reviewFetchDate, setReviewFetchDate] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalReviews = reviews.length;

      // Log the reviews array to check its structure
      console.log("Reviews Array:", reviews);

      const ratingCounts = reviews.reduce((acc, review) => {
        if (review.rating) {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
        } else {
          console.warn("Review without rating found:", review);
        }
        return acc;
      }, {});

      // Log ratingCounts for debugging
      console.log("Rating Counts:", ratingCounts);

      const ratingPercentages = {
        5: ((ratingCounts[5] || 0) / totalReviews) * 100,
        4: ((ratingCounts[4] || 0) / totalReviews) * 100,
        3: ((ratingCounts[3] || 0) / totalReviews) * 100,
        2: ((ratingCounts[2] || 0) / totalReviews) * 100,
        1: ((ratingCounts[1] || 0) / totalReviews) * 100,
      };

      // Log ratingPercentages for debugging
      console.log("Rating Percentages:", ratingPercentages);

      setRatingPercentages(ratingPercentages);
    } else {
      console.log("No reviews found.");
    }
  }, [reviews]);

  const getReviews = async () => {
    setLoadingReview(true);
    setupAxios();

    let reviews = [];
    let nextPageUrl = `/your-api-endpoint-for-reviews/?bussiness=${bussiness}`;

    try {
      while (nextPageUrl) {
        const res = await reviewGet(nextPageUrl);
        const fetchedReviews = res?.data?.results || [];
        reviews = [...reviews, ...fetchedReviews];
        nextPageUrl = res?.data?.next || null;
      }

      setAverageRating(calculateAverageRating(reviews));
      setAllReview(reviews);

      const totalReviewsCount = reviews.length;
      const ratingCounts = reviews.reduce((acc, review) => {
        if (review.rating) {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
        }
        return acc;
      }, {});

      const newRatingPercentages = {
        5: ((ratingCounts[5] || 0) / totalReviewsCount) * 100,
        4: ((ratingCounts[4] || 0) / totalReviewsCount) * 100,
        3: ((ratingCounts[3] || 0) / totalReviewsCount) * 100,
        2: ((ratingCounts[2] || 0) / totalReviewsCount) * 100,
        1: ((ratingCounts[1] || 0) / totalReviewsCount) * 100,
      };

      setRatingPercentages(newRatingPercentages);
      setTotalReviews(totalReviewsCount);

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReview(false);
    }
  };


  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      const firstInitial = names[0].charAt(0).toUpperCase();
      const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    }
  };

  const modifyWebsiteUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  };

  const renderStars = (rating) => {
    const fullStarsCount = Math.floor(rating); // Full stars are the integer part of the rating
    const halfStarNeeded = rating % 1 !== 0; // Check if there's a half star
    const emptyStarsCount = 5 - fullStarsCount - (halfStarNeeded ? 1 : 0); // Remaining stars are empty

    const fullStars = Array(fullStarsCount).fill(<img src={fullStar} alt="full-star" className="w-4" />);

    // Define halfStar only if needed
    const halfStar = halfStarNeeded ? <img src={halfStarImage} alt="half-star" className="w-4" /> : null;

    const emptyStars = Array(emptyStarsCount).fill(<img src={blankStar} alt="empty-star" className="w-4" />);

    return [...fullStars, halfStar, ...emptyStars];
  };


  return (
    <>
      <div>
        < div className="mx-auto lg:flex flex-col justify-between items-center gap-4 my-10 lg:mb-10 lg:mt-20 p-4 lg:py-8 lg:px-16 rounded-[10px] border-2 w-[80%] bg-[#e7f1f7]" >
          <div className="-mt-28">
            <img src={profile.logo} alt="image" className="w-[150px] rounded-full h-[150px] border-4 border-[#287BB7]" />
          </div>
          <div className="flex  justify-evenly w-[70%]">
            <div className="items-center gap-4">
              <div className="">
                <h2 className="text-[28px] font-normal">
                  <span className="font-bold gradient"> {profile?.name}</span>
                </h2>
                <div className="flex items-center gap-2 mt-3 lg:mt-0">
                  {renderStars(averageRating)}
                  <h6 className="font-normal text-[#8D8D8D]">
                    <span className="font-bold text-black">{averageRating || "0"}</span> ({`${totalReviews} Reviews` || "0 Reviews"})
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center">
                <a target={profile.website} href={modifyWebsiteUrl(profile.website)}>
                  <img src={worldOuter} alt="world-outer" className="w-10 -mt-2" />
                  <img src={world} alt="world" className="w-8 -mt-9 ml-1" />
                </a>
              </div>
              <div className="">
                <h2 className="text-[15px] font-light leading-5">
                  Live <span className="font-bold gradient"> Site </span>
                </h2>
                <p className="text-[#666666]">{profile.website}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly w-[60%]">
            <button className=" flex items-center justify-center border bg-[#287BB7] w-[40%] h-16 p-6 rounded-[10px]"
              onClick={() => window.ScrollToOptions('#dropReview').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex justify-center w-[100%] items-center">
                <img src={reviewIcon} alt="review-icon" className="w-16 filter invert" />
                <span className="text-white font-bold text-lg">
                  Write Review
                </span>
              </span>
            </button>
            <button className=" flex items-center justify-center border border-[#287BB7] w-[40%] h-16 p-6 rounded-[10px] bg-white">
              <span className="flex items-center gap-4 ">
                <img src={share} alt="save" />
                <span className="text-[#287BB7] bgred font-bold text-lg">
                  Share
                </span>
              </span>
            </button>
          </div>
        </div >
        <div className="flex justify-center items-center my-10 lg:my-16">
          <h2 className="text-[#000000] text-center">
            <span className="text-xl lg:text-2xl block font-bold mb-1 gradient">
              Followers
            </span>
            <span className="text-2xl lg:text-4xl font-light relative">
              <span className="gradient font-black">Top </span> Brand in one
              place
              <img
                className="flex justify-end absolute right-0 -bottom-5 h-[28px]"
                src={Vector}
                alt="arrow"
              />
            </span>
          </h2>
        </div>
      </div>
      <div className="">
        <div className="grid lg:grid-cols-2 ">
          <div className="">
            <div className="flex flex-col justify-center items-center">
              <div className="my-12">
                <img src={facebook} alt="brand-icon" className="w-[150px] rounded-full h-[150px]" />
                <img src={mariaProfile} alt="brand-icon" className="-mt-8 ml-24 w-[50px] rounded-full h-[50px] border-2  border-[#287BB7]" />
              </div>
              <h2 className="text-[#000000] text-center">
                <span className="text-xl lg:text-2xl block font-bold mb-1">
                  {profile?.name}
                </span>
                <span className="flex flex-col text-4xl font-light relative items-center">
                  <span><span className="gradient font-black">Facebook </span>Followers</span>
                  <a href={profile.facebook} className="flex items-center" target="_blank">
                    <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                    <span className="text-sm mx-1 text text-[#287BB7] hover:text-[#4ea0db] font-bold">Visit Facebook</span>
                  </a>
                </span>
              </h2>
              <div className="flex justify-center items-center flex-col py-10">
                <h2 className="gradient font-black text-xl lg:text-4xl">
                  {profile?.facebook_followers}
                </h2>
                <p className="font-light text-black">{profile?.name}</p>
              </div>
            </div>
            <div className="lg:w-[80%] mx-auto box-shadow2 rounded-[10px]">
            </div>
          </div>
          <div className="lg:border-l-2 border-[#287BB7]">
            <div className="flex flex-col justify-center items-center">
              <div className="my-12">
                <img src={instagram} alt="brand-icon" className="w-[150px] rounded-full h-[150px] " />
                <img src={mariaProfile} alt="brand-icon" className="-mt-8 ml-24 w-[50px] rounded-full h-[50px] border-2 border-[#287BB7]" />
              </div>                  <h2 className="text-[#000000] text-center">
                <span className="text-xl lg:text-2xl block font-bold mb-1">
                  {profile?.name}
                </span>
                <span className="flex flex-col text-2xl items-center lg:text-4xl font-light relative">
                  <span><span className="gradient font-black">Instagram </span>Followers</span>
                  <a href={profile.insta} className="flex items-center" target="_blank">
                    <img src={linkIcon} alt="link-icon" className="w-[16px] h-[16px]" />
                    <span className="text-sm mx-1 text text-[#287BB7] hover:text-[#4ea0db] font-bold">Visit Instagram</span>
                  </a>
                </span>
              </h2>
              <div className="flex justify-center items-center flex-col py-10">
                <h2 className="gradient font-black text-xl lg:text-4xl">
                  {profile?.insta_followers}
                </h2>
                <p className="font-light text-black">{profile?.name}</p>
              </div>
            </div>
            <div className="lg:w-[80%] mx-auto box-shadow2 rounded-md">
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full h-[50vh] my-40">
        <h2 className="text-3xl font-normal absolute text-white mt-52 ml-10">
          <span className="font-bold "> Recommended </span><br />Reviews
        </h2>
        <div className=" w-[35%] rounded-3xl bg-[#287BB7]"></div>
        <div className="mt-20 ml-80 w-[65%] absolute left- bg-transparent">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={2.5}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="multiple-slide-carousel swiper-container relative"
          >
            {highRatingReviews.map((review) => (
              <SwiperSlide key={review.id} className="swiper-slide">
                <div className="bg-white shadow-box-shadow border-4 rounded-3xl h-80 flex flex-col p-6">
                  <div className="max-h-52 min-h-52 p-2 mb-2 text-[#747474]">
                    {review.description.length > 100
                      ? `${review.description.substring(0, 100)}...`
                      : review.description}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="border-2 rounded-full w-14 h-14 flex justify-center items-center text-xl border-[#287BB7]">
                      {getInitials(review.user_name || "Anonymous")}
                    </div>
                    <div className="flex flex-col font-bold">
                      <p>{review.user_name || "Anonymous"}</p>
                      <div className="flex gap-1 ml-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute flex  m-auto left-0 right-0 w-fit mt-12 gap-4">
            <button
              ref={prevRef}
              className="!w-12 !h-12 !p-2 text-[50px] bg-[#287BB7] text-white flex justify-center items-center rounded-full"
              aria-label="Previous Slide">
              &lt;
            </button>
            <button
              ref={nextRef}
              className="!w-12 !h-12 !p-2 text-[50px] bg-[#287BB7] text-white flex justify-center items-center border rounded-full "
              aria-label="Next Slide">
              &gt;
            </button>
          </div>
        </div>
        {/* slider ends here */}
        {/* </div> */}
      </div>

      <div className="box-shadow2 my-10 p-4 lg:p-10 rounded-[10px]">
        <div className="flex justify-evenly items-center">
          <div className="w-[50%] px-4">
            <div className="">
              <h2 className="text-4xl font-normal">
                <span className="font-bold gradient"> Over All </span> Rating
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[#737072] text-2xl font-bold">
                  {averageRating}
                </span>
                <div className="flex">
                  {renderStars(averageRating)}
                </div>
              </div>
            </div>
            <h6 className="text-[#737072] font-normal text-xl lg:text-2xl mb-3">
              {`${totalReviews} Reviews`}
            </h6>
            <p className="text-[#BBBBBB] text-xl">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
          </div>
          <div className="w-[50%]  px-36">
            <div className="flex gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
              5 Stars
              <div className="flex justify-center items-center gap-4">
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
              </div>
              ({ratingPercentages[5].toFixed(0)}%)
            </div>
            <div className="flex gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
              4 Stars
              <div className="flex justify-center items-center gap-4">
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
              </div>
              ({ratingPercentages[4].toFixed(0)}%)
            </div>
            <div className="flex gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
              3 Stars
              <div className="flex justify-center items-center gap-4">
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
              </div>
              ({ratingPercentages[3].toFixed(0)}%)
            </div>
            <div className="flex gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
              2 Stars
              <div className="flex justify-center items-center gap-4">
                <img src={fullStar} alt="star-image" />
                <img src={fullStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
              </div>
              ({ratingPercentages[2].toFixed(0)}%)
            </div>
            <div className="flex gap-8 items-center mb-8 text-2xl font-bold text-[#737072]">
              1 Stars
              <div className="ml-[6px] flex justify-center items-center gap-4">
                <img src={fullStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
                <img src={blankStar} alt="star-image" />
              </div>
              ({ratingPercentages[1].toFixed(0)}%)
            </div>
          </div>
        </div>
      </div>
      {/* show review */}
      <div className="container mt-32" id="dropReview">
        {/* Profile details can be displayed here if necessary */}
        <div className="my-10  flex-col w-[100%] mx-auto py-4 px-2 rounded-2xl text-justify ">
          {/* Render reviews */}
          {loadingReview ? (
            <p>Loading reviews...</p>
          ) : (
            currentReviews.map((review) => (
              <div key={review.id} className="flex flex-col my-4 shadow-box-shadow p-4">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="border-2 rounded-full w-14 h-14 flex justify-center items-center text-2xl border-[#287BB7]">
                      {review.user_initials || "U"}
                    </div>
                    <div className="">
                      <label className="ml-1 font-bold text-xl">{review.user.first_name + " " + review.user.last_name || "Anonymous"}</label>
                      <div className="flex gap-1 ml-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#888686] flex justify-center">
                    <img src={calander} alt="calander-icon" className="w-6 h-5 mt-[1px] mr-1" />
                    {reviewFetchDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="ml-1 my-2 text-lg text-[#888686]">
                  <p>{review.description}</p>
                </div>
              </div>
            ))
          )}
          <div className="pagination-controls flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </div >

        <div className="dropReview">
          <h3 className="text-xl lg:text-3xl mt-28 mb-8">
            <span className="font-black gradient"> Drop </span>
            <span className=" font-bold">Your Review</span>
          </h3>
          {isAuthenticated ? (
            <AddReview />
          ) : (
            <SignIn brandId={bussiness} text={"To Post Review"} />
          )}
        </div>
      </div >

      <OurListed />
    </>
  );
}
