import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/Vector.png";
import star from "../../assets/images/star.svg";
import world from "../../assets/images/world.png";
import maria from "../../assets/images/maria.png";
import worldOuter from "../../assets/images/world-outer.png";
import location from "../../assets/images/location.png";
import { HTTP_CLIENT } from "../../utils/axiosClient"; // Directly using HTTP_CLIENT without setupAxios
import { getAllProfiles, reviewGet } from "../../services/business";
import Loader from "../../components/Loader/loader";
import NoData from "../../components/noData/noData";
import AOS from "aos";
import { Link } from "react-router-dom";

export default function FeaturedListings() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

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

            return {
              ...profile,
              reviews,
              rating,
            };
          } catch (error) {
            console.error(`Error fetching reviews for profile ${profile.id}: `, error);
            return {
              ...profile,
              reviews: [],
              rating: "0",
            };
          }
        })
      );

      // console.log("Profiles with Reviews fetched: ", profilesWithReviews);
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

  // const modifyWebsiteUrl = (url) => {
  //   if (!url.startsWith('https://')) {
  //     return `https://${url}`;
  //   }
  //   return url;
  // };
  const ensureProtocol = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
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

      <div className="container px-0 grid grid-cols-4 my-20 mx-auto">
        {/* <div className="container flex-wrap justify-between items-center flex gap-5 mt-12"> */}
        {loading ? (
          <Loader />
        ) : profiles.length === 0 ? (
          <NoData />
        ) : (
          profiles.slice(0, 8).map((profile) => {
            const websiteURL = ensureProtocol(profile.website);
            const reviewCount = profile.reviews.length || 0;
            return (
              <div
                key={profile.id}
                data-aos="fade-right"
                data-aos-delay="300"
                className="bg-white border my-6 border-[#EAF7FF] lg:w-[90%] sm:w-[45%] h-full rounded-3xl flex max-h-[390px] min-h-[400px] flex-col pt-2 px-5 pb-5 shadow-light-shadow hover:animate-grow"
              >
                <div>
                  <div className="flex items-center justify-center mt-2">
                    <div className="gradient-border p-1 w-[90px] h-[90px]">
                      <img
                        src={profile.logo}
                        alt="cloths"
                        className="w-[80px] h-[80px] rounded-full "
                      />
                    </div>
                  </div>
                  <div className="bg-[#eaf7ff] border-border2 pt-16 p-4 -mt-[50px] rounded-2xl">

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-2 items-center">
                        <p className="gradient2 p-2 text-xl rounded-xl text-white flex items-center justify-center">
                          {profile.rating}
                        </p>
                        <div className="">
                          <img src={star} alt="star" className="mb-1" />
                          <h4 className="text-[14px] text-[#8D8D8D]">
                            ({reviewCount} Review{reviewCount !== 1 ? 's' : ''})
                          </h4>
                        </div>
                      </div>
                      {/* <a target="_blank" href={modifyWebsiteUrl(profile.website)}> */}
                      <a target="_blank" href={websiteURL}>
                        {/* {console.log("URL of each brand = " + profile.website)} */}

                        <img src={worldOuter} alt="website" className="rounded-lg" />
                        <img src={world} alt="website" className="rounded-lg -mt-[33px] ml-[9px]" />
                      </a>
                    </div>
                  </div>
                  <div className="py-6">
                    <h4 className="text-[16px] font-normal pt-0">
                      <span className="gradient"> {capitalizeWords(profile.name)}</span>
                    </h4>
                    <h6 className="text-[16px] font-normal flex items-center mb-2">
                      <span className=""> {profile.country} </span>
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
