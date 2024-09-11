import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import star from "../../assets/images/star.svg";
import world from "../../assets/images/world.png";
import maria from "../../assets/images/maria.png";
import worldOuter from "../../assets/images/world-outer.png";
import defaultImg from "../../assets/images/default-brand.png";
import location from "../../assets/images/location.png";
import { HTTP_CLIENT } from "../../utils/axiosClient";
import { getRatingDetails, reviewGet } from "../../services/business";
import Loader from "../../components/Loader/loader";
import NoData from "../../components/noData/noData";
import fullStar from "../../assets/images/full-star.png";
import halfStarImage from "../../assets/images/half-star.png";
import blankStar from "../../assets/images/blank-star.png";
import AOS from "aos";
import { Link } from "react-router-dom";

export default function FeaturedListings() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProfiles, setVisibleProfiles] = useState(8);

  const updateVisibleProfiles = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleProfiles(3);
    } else {
      setVisibleProfiles(8);
    }
  };

  useEffect(() => {
    updateVisibleProfiles();
    window.addEventListener('resize', updateVisibleProfiles);


    return () => {
      window.removeEventListener('resize', updateVisibleProfiles);
    };
  }, []);

  const getProfileWithReviews = async () => {
    try {
      setLoading(true);
      const res = await HTTP_CLIENT.get('/api/profile/');
      const profiles = res?.data?.results || [];

      const profilesWithReviews = await Promise.all(
        profiles.map(async (profile) => {
          try {
            const reviewResponse = await reviewGet(profile.id);
            const reviews = reviewResponse?.data?.results || [];
            const rating = reviews.length
              ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              : "0";

            // Fetch the rating details
            const ratingDetails = await getRatingDetails(profile.id);
            const averageRating = ratingDetails?.average_rating || "0.0";
            const totalReviews = ratingDetails?.rating_count || "0";

            return {
              ...profile,
              reviews,
              rating, // Keep the old review ratings
              averageRating, // New average rating from the API
              totalReviews, // New total reviews count from the API
            };
          } catch (error) {
            console.error(`Error fetching reviews or ratings for profile ${profile.id}: `, error);
            return {
              ...profile,
              reviews: [],
              rating: "0",
              averageRating: "0.0", // Set defaults if error
              totalReviews: "0", // Set defaults if error
            };
          }
        })
      );

      setProfiles(profilesWithReviews);
    } catch (error) {
      console.error("Error fetching profiles with reviews: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileWithReviews();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 4000,
      once: true,
    });
  }, []);

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const ensureProtocol = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  };

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
    <div className=""
      data-aos-delay="300"
      data-aos="zoom-in"
    >
      <div className="flex justify-center items-center">
        <h2 className="text-[#000000] text-center">
          <span className="text-xl lg:text-2xl block font-bold mb-1">
            Featured Listings
          </span>
          <span className="text-2xl lg:text-4xl font-semibold relative">
            <span className="gradient font-black"> Cloths Goods </span> Business
            <img
              className="flex justify-end absolute right-0 -bottom-5 h-[28px]"
              src={Vector}
              alt="arrow"
            />
          </span>
        </h2>
      </div>
      <div className="container px-0 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-20 mx-auto">
        {loading ? (
          <Loader />
        ) : profiles.length === 0 ? (
          <NoData />
        ) : (
          profiles.slice(0, visibleProfiles).map((profile) => {
            const websiteURL = ensureProtocol(profile.website);
            return (
              <div
                key={profile.id}
                data-aos="fade-right"
                data-aos-delay="300"
                className="bg-white xsm:mx-8 border my-6 border-[#EAF7FF] sm:w-[90%] mx-auto mb-3 xl:mb-0 lg:w-[90%] rounded-3xl flex max-h-[390px] min-h-[400px] flex-col pt-2 px-5 pb-5 shadow-light-shadow hover:animate-grow"
              >
                <div>
                  <div className="flex items-center justify-center mt-2">
                    <div className="gradient-border p-1 w-[90px] h-[90px]">
                      <img
                        src={profile?.logo || defaultImg}
                        alt="cloths"
                        className="w-[80px] h-[80px] rounded-full filter invert"
                        onError={(e) => {
                          e.target.src = defaultImg;
                        }}
                      />
                    </div>
                  </div>
                  <div className="bg-[#eaf7ff] border-border2 pt-16 p-4 -mt-[50px] rounded-2xl">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-2 items-center">
                        <p className="gradient2 p-2 text-xl rounded-xl text-white flex items-center justify-center">
                          {parseFloat(profile.averageRating).toFixed(1)}
                        </p>
                        <div className="">
                          <div className="flex">{renderStars(profile.averageRating || 0)}</div>
                          <h4 className="text-[14px] text-[#8D8D8D]">
                            ({profile.totalReviews} Reviews)
                          </h4>
                        </div>
                      </div>
                      <a target="_blank" href={websiteURL}>
                        {/* <img src={worldOuter} alt="website" className="rounded-lg" /> */}
                        <img src={world} alt="website" className="w-8 rounded-lg  ml-[9px]" />
                      </a>
                    </div>
                  </div>
                  <div className="py-6">
                    <h4 className="text-[16px] font-normal pt-0">
                      <span className="gradient"> {capitalizeWords(profile.name)}</span>
                    </h4>
                    <h6 className="text-[16px] font-normal flex items-center mb-2">
                      <span className=""> Pakistan {profile.country} </span>
                      <img src={location} alt="location" className="ps-1" />
                    </h6>
                    <p className="text-[#8A8A8A] text-[14px] min-h-16 overflow-hidden">
                      {profile.description?.length > 70
                        ? `${profile.description.substring(0, 65)} ...`
                        : profile.description || "No Description Available"}
                    </p>
                    <Link to={`/business-details/${profile.id}`} onClick={() => window.scrollTo(0, 0)}>
                      <button className="gradient2 text-lg p-3 rounded-2xl text-white w-full mb-0 hover:shadow-box-shadow">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
