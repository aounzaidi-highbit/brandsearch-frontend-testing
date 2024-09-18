import React, { useEffect, useState, useMemo } from "react";
import Vector from "../../assets/images/Vector.png";
import world from "../../assets/images/world.png";
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
import { useNavigate } from "react-router-dom";
import { capitalizeWords, ensureProtocol, slugify } from "../../utils/helper";

const ProfileCard = React.memo(({ profile, handleBrandClick, renderStars, ensureProtocol, capitalizeWords }) => {
  const websiteURL = ensureProtocol(profile.website);

  const capitalizedProfileName = useMemo(() => capitalizeWords(profile.name), [profile.name]);
  const starRatings = useMemo(() => renderStars(profile.averageRating || 0), [profile.averageRating]);

  return (
    <button onClick={() => handleBrandClick(profile)}>
      <div
        key={profile.id}
        data-aos="fade-right"
        data-aos-delay="300"
        className="bg-white xsm:mx-8 border border-[#EAF7FF] sm:w-[90%] mx-auto mb-3 xl:mb-0 lg:w-[90%] rounded-3xl flex flex-col px-5 shadow-box-shadow hover:animate-grow my-10"
      >
        <div>
          <div className="flex items-center justify-center">
            <div className="gradient-border w-[90px] h-[90px]">
              <img
                loading="lazy"
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
                <div>
                  <div className="flex">{starRatings}</div>
                  <h4 className="text-[14px] text-[#8D8D8D]">
                    ({profile.totalReviews} Reviews)
                  </h4>
                </div>
              </div>
              <a target="_blank" href={websiteURL} onClick={(e) => e.stopPropagation()} rel="noopener noreferrer">
                <img src={world} alt="website" className="w-8 rounded-lg  ml-[9px]" />
              </a>
            </div>
          </div>
          <div className="py-6 text-left">
            <h4 className="text-[16px] font-normal pt-0">
              <span className="gradient"> {capitalizedProfileName}</span>
            </h4>
            <h6 className="text-[16px] font-normal flex mb-2">
              <span className=""> Pakistan {profile.country} </span>
              <img src={location} alt="location" className="ps-1" />
            </h6>
            <p className="text-[#8A8A8A] text-[14px] overflow-hidden">
              {profile.description?.length > 70
                ? `${profile.description.substring(0, 65)} ...`
                : profile.description || "No Description Available"}
            </p>

          </div>
        </div>
      </div>
    </button>
  );
});

export default function FeaturedListings() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProfiles, setVisibleProfiles] = useState(8);

  const updateVisibleProfiles = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleProfiles(3);
    } else {
      setVisibleProfiles(6);
    }
  };

  useEffect(() => {
    updateVisibleProfiles();
    window.addEventListener("resize", updateVisibleProfiles);

    return () => {
      window.removeEventListener("resize", updateVisibleProfiles);
    };
  }, []);

  const getProfileWithReviews = async () => {
    try {
      setLoading(true);
      const res = await HTTP_CLIENT.get("/api/profile/");
      const profiles = res?.data?.results || [];

      const profilesWithReviews = await Promise.all(
        profiles.map(async (profile) => {
          try {
            const reviewResponse = await reviewGet(profile.id);
            const reviews = reviewResponse?.data?.results || [];
            const rating = reviews.length
              ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              : "0";

            const ratingDetails = await getRatingDetails(profile.id);
            const averageRating = ratingDetails?.average_rating || "0.0";
            const totalReviews = ratingDetails?.rating_count || "0";

            return {
              ...profile,
              reviews,
              rating,
              averageRating,
              totalReviews,
            };
          } catch (error) {
            console.error(`Error fetching reviews or ratings for profile ${profile.id}: `, error);
            return {
              ...profile,
              reviews: [],
              rating: "0",
              averageRating: "0.0",
              totalReviews: "0",
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

  const renderStars = (rating) => {
    const fullStarsCount = Math.floor(rating);
    const halfStarNeeded = rating % 1 !== 0;
    const emptyStarsCount = 5 - fullStarsCount - (halfStarNeeded ? 1 : 0);

    const fullStars = Array(fullStarsCount).fill(<img src={fullStar} alt="full-star" className="w-4" />);
    const halfStar = halfStarNeeded ? <img src={halfStarImage} alt="half-star" className="w-4" /> : null;
    const emptyStars = Array(emptyStarsCount).fill(<img src={blankStar} alt="empty-star" className="w-4" />);

    return [...fullStars, halfStar, ...emptyStars];
  };

  const navigate = useNavigate();
  const handleBrandClick = (profile) => {
    navigate(`/review/${slugify(profile.name)}`, { state: { id: profile.id } });
  };

  // const slugify = (text) => {
  //   return text
  //     .toString()
  //     .toLowerCase()
  //     .replace(/\s+/g, "-") // Replace spaces with -
  //     .replace(/[^\w\-]+/g, "") // Remove all non-word chars
  //     .replace(/\-\-+/g, "-") // Replace multiple - with single -
  //     .replace(/^-+/, "") // Trim - from start of text
  //     .replace(/-+$/, ""); // Trim - from end of text
  // };

  // const capitalizeWords = (str) => {
  //   if (!str) return "";
  //   return str
  //     .toLowerCase()
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };

  // const ensureProtocol = (url) => {
  //   if (!url) return "#";
  //   if (!/^https?:\/\//i.test(url)) {
  //     return `https://${url}`;
  //   }
  //   return url;
  // };

  return (
    <div className="sm:p-6">
      <div className="flex justify-center items-center mb-10">
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
      {loading ? (
        <Loader />
      ) : profiles.length === 0 ? (
        <NoData />
      ) : (
        <div className="lg:px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {profiles.slice(0, visibleProfiles).map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              handleBrandClick={handleBrandClick}
              renderStars={renderStars}
              ensureProtocol={ensureProtocol}
              capitalizeWords={capitalizeWords}
            />
          ))}
        </div>
      )}
    </div>
  );
}
