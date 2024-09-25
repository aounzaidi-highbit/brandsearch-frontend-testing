import brandLogo from "../../assets/images/brand-logo.svg";
import forwardImg from "../../assets/images/forward.png";
import arrow from "../../assets/images/arrow.png";
import { capitalizeWords, getInitials } from "../../utils/helper";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { setupAxios } from "../../utils/axiosClient";
import { getAllCategories } from "../../services/business";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  let location = useLocation();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("first_name")

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

  const token = localStorage.getItem("access_token");
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnterCat = () => {
    setIsCatOpen(true);
  };

  const handleMouseLeaveCat = () => {
    setIsCatOpen(false);
  };
  const handleMouseEnterProfile = () => {
    setIsProfileOpen(true);
  };

  const handleMouseLeaveProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className=" ">
      <nav className="shadow-lg relative z-50 w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto py-6 container ">
          <div className="flex items-center gap-16 ">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={brandLogo} className="h-8" alt="Brand Logo" />
            </Link>
            <ul className="hidden md:flex flex-col font-medium gap-5 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
              <li>
                {location?.pathname === "/" ? (
                  <Link to="/" className="block py-2 px-3 md:p-0 text-[18px] rounded md:bg-transparent text-[#287BB7]"
                  >Home</Link>
                ) : (
                  <Link to="/" className="block py-2 px-3 md:p-0 font-medium text-[#464F54] md:hover:text-[#287BB7] text-[18px] rounded md:bg-transparent"
                  >Home</Link>
                )}
              </li>
              {location?.pathname === "/business-list" ? (
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-[#287BB7] font-medium text-[18px] rounded  md:hover:bg-transparent md:hover:text-[#287BB7]"> Bussiness List</Link>
                </li>
              ) : (
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-[#464F54] font-medium text-[18px] rounded  md:hover:bg-transparent md:hover:text-[#287BB7]"> Bussiness List</Link>
                </li>
              )}
              {location?.pathname === "/blogs" ? (
                <li>
                  <Link to="/blogs" className="block py-2 px-3 md:p-0 text-[#287BB7] font-medium text-[18px] rounded  md:hover:bg-transparent md:hover:text-[#287BB7]"> Blogs</Link>
                </li>
              ) : (
                <li>
                  <Link to="/blogs" className="block py-2 px-3 md:p-0 text-[#464F54] font-medium text-[18px] rounded  md:hover:bg-transparent md:hover:text-[#287BB7]"> Blogs</Link>
                </li>
              )}

              <li>
                <div className="relative">
                  <button
                    className=" flex gap-2 items-center py-2 px-3 md:p-0 text-[#464F54] font-medium text-[18px] rounded  md:hover:bg-transparent md:hover:text-[#287BB7]"
                    onMouseEnter={handleMouseEnterCat}
                    onMouseLeave={handleMouseLeaveCat}
                  >
                    Categories
                    <img src={arrow} alt="arrow-icon" className={`w-3 ${isCatOpen ? "rotate-180" : "rotate-0"}`} />
                  </button>

                  {isCatOpen && (
                    <div
                      className="absolute left-0 w-56 bg-white rounded-md shadow-box-shadow"
                      onMouseEnter={handleMouseEnterCat}
                      onMouseLeave={handleMouseLeaveCat}>
                      {(
                        category?.map((item) => {
                          return (
                            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer md:hover:text-[#287BB7]"
                              key={item?.id}
                              to={`/business-list?category=${item?.name}`}
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              {capitalizeWords(item?.name)} <br />
                            </Link>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex gap-10">
              {token ? (
                <div className="relative">
                  <button
                    className="text-black flex items-center gap-2 focus:outline-none rounded-lg lg:text-[18px] font-semibold cursor-default"
                    type="button"
                    onMouseEnter={handleMouseEnterProfile}
                    onMouseLeave={handleMouseLeaveProfile}>
                    <div className="border border-[#287BB7] w-10 h-10 flex items-center justify-center rounded-full text-2xl">{getInitials(userName)}</div>{userName}
                    <img src={arrow} alt="arrow-icon" className={`w-3 ${isProfileOpen ? "rotate-180" : "rotate-0"}`} />
                  </button>

                  {isProfileOpen && (
                    <div
                      className="absolute left-0 mt-0 w-52 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseEnter={handleMouseEnterProfile}
                      onMouseLeave={handleMouseLeaveProfile}
                    >
                      {location?.pathname === "/user-reviews" ? (
                        <Link to="/user-reviews">
                          <button
                            type="button"
                            className="text-[#287BB7] w-full flex gap-2 items-center hover:bg-gray-100  focus:outline-none font-medium rounded-lg lg:text-[16px] px-4 py-2 text-center"
                          >
                            My Reviews
                          </button>
                        </Link>
                      ) : (
                        <Link to="/user-reviews">
                          <button
                            type="button"
                            className="text-[#464F54] w-full flex md:hover:text-[#287BB7] hover:bg-gray-100 gap-2 items-center focus:outline-none font-medium rounded-lg lg:text-[16px] px-4 py-2 text-center"
                          >
                            My Reviews
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={() => handleLogout()}
                        type="button"
                        className="text-[#464F54] flex gap-2 w-full md:hover:text-[#287BB7] hover:bg-gray-100 items-center focus:outline-none font-medium rounded-lg lg:text-[16px] px-4 py-2 text-center"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="text-black flex gap-2 items-center bg-transparent focus:outline-none font-medium rounded-lg lg:text-[18px] px-4 py-2 text-center"
                >
                  <Link className="flex gap-2 md:hover:text-[#287BB7] xsm:text-[18px]" to="/signin">
                    <img src={forwardImg} alt="forwarding" />Login
                  </Link>
                </button>
              )}
              <button
                className="text-white xsm:hidden bg-[#287BB7] hover:bg-[#287BB7] hover:text-[#ffffff] focus:ring-4 focus:outline-none font-bold rounded-lg lg:text-[18px] px-4 py-2 text-center"
                type="button"
              >
                <Link to="/contact"> Contact</Link>
              </button>
            </div>
            <button
              onClick={toggleMobileMenu}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* mobile view */}
          <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"
              } w-[100%] bg-white shadow-box-shadow mt-2`}
          >
            <div className="items-center justify-between w-full md:flex md:w-auto"
              id="navbar-cta">
              <ul className="md:hidden flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-[#464F54] dark:border-gray-700">
                <li>
                  <Link to="/" className="block py-2 px-3 md:p-0 text-[#464F54] focus:bg-[#287BB7] focus:text-white rounded md:bg-transparent md:text-[#287BB7] md:dark:text-blue-500 active:text-white"
                  > Home</Link>
                </li>
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-[#464F54] rounded  md:hover:bg-transparent md:hover:text-[#287BB7] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-[#287BB7] focus:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:bg-[#287BB7] active:text-white"
                  > Bussiness List</Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-2 px-3 md:p-0 text-[#464F54] rounded focus:text-white md:hover:bg-transparent md:hover:text-[#287BB7] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-[#287BB7] md:dark:hover:bg-transparent dark:border-gray-700 active:bg-[#287BB7] active:text-white"
                  > Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
