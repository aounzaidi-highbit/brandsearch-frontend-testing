import brandLogo from "../../assets/icons/brand-logo.svg";
import menu from "../../assets/icons/menu.svg";
import arrow from "../../assets/icons/arrow.svg";
import { capitalizeWords, getInitials } from "../../utils/helper";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { setupAxios } from "../../utils/axiosClient";
import { getAllCategories } from "../../services/business";

export default function Header() {
  let location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const userName = localStorage.getItem("first_name")

  const getCategories = async () => {
    setupAxios();
    try {
      const res = await getAllCategories();
      setCategory(res?.data?.results);
    } catch (error) {
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

  return (
    <div className=" ">
      <nav className="shadow-lg relative z-50 w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto py-6 px-10  lg:container ">
          <div className="flex items-center gap-8 lg:gap-16 ">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={brandLogo} className="h-8" alt="Brand Logo" />
            </Link>
            <ul className="hidden md:visible md:flex font-medium gap-2 lg:gap-5 p-4 md:p-0 mt-4 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
              <li>
                {location?.pathname === "/" ? (
                  <Link to="/" className="block py-2 px-3 md:p-0 text-sm lg:text-[18px] rounded  text-Primary"
                  >Home</Link>
                ) : (
                  <Link to="/" className="block py-2 px-3 md:p-0 font-medium text-[#464F54] md:hover:text-Primary text-sm lg:text-[18px] rounded "
                  >Home</Link>
                )}
              </li>
              {location?.pathname === "/business-list" ? (
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-Primary font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"> Bussiness List</Link>
                </li>
              ) : (
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-[#464F54] font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"> Bussiness List</Link>
                </li>
              )}
              {location?.pathname === "/blogs" ? (
                <li>
                  <Link to="/blogs" className="block py-2 px-3 md:p-0 text-Primary font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"> Blogs</Link>
                </li>
              ) : (
                <li>
                  <Link to="/blogs" className="block py-2 px-3 md:p-0 text-[#464F54] font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"> Blogs</Link>
                </li>
              )}
              <li>
                <div className="relative">
                  <button
                    className=" flex gap-2 items-center py-2 px-3 md:p-0 text-[#464F54] font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"
                    onMouseEnter={() => setIsCatOpen(true)}>
                  {/* onMouseLeave={() => setIsCatOpen(false)} */}
                  
                    Categories
                    <img src={arrow} alt="arrow-icon" className={`w-3 ${isCatOpen ? "rotate-180" : "rotate-0"}`} />
                  </button>
                  {isCatOpen && (
                    <div
                      className="absolute left-0 w-56 mt-2 bg-white rounded-md shadow-box-shadow"
                      onMouseEnter={() => setIsCatOpen(true)}
                      onMouseLeave={() => setIsCatOpen(false)}>
                      {(category?.map((item) => {
                        return (
                          <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer md:hover:text-Primary"
                            key={item?.id}
                            to={`/business-list?category=${item?.name}`}
                            onClick={() => window.scrollTo(0, 0)}>{capitalizeWords(item?.name)}<br /></Link>
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
            <div className="flex xsm:gap-0 gap-5 lg:gap-10 items-center">
              {token ? (
                <div className="relative flex justify-center items-center">
                  <div className="border border-Primary w-7 lg:w-10 h-7 lg:h-10 flex items-center justify-center rounded-full md:text-lg lg:text-2xl">{getInitials(userName)}</div>
                  <img src={arrow} alt="arrow-icon" className={`w-4 xsm:hidden cursor-pointer ml-3 ${isProfileOpen ? "rotate-180" : "rotate-0"}`}
                    onMouseEnter={() => setIsProfileOpen(true)}
                  // onMouseLeave={() => setIsProfileOpen(false)}
                  />
                  {isProfileOpen && (
                    <div
                      className="absolute left-0 mt-36 w-52 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none xsm:hidden"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}>
                      {location?.pathname === "/user-reviews" ? (
                        <Link to="/user-reviews">
                          <button
                            type="button"
                            className="text-Primary w-full flex gap-2 items-center hover:bg-gray-100  focus:outline-none font-medium rounded-lg text-[12px] lg:text-[15px] px-4 py-2 text-center"
                          >
                            My Reviews
                          </button>
                        </Link>
                      ) : (
                        <Link to="/user-reviews">
                          <button
                            type="button"
                            className="text-[#464F54] w-full flex md:hover:text-Primary hover:bg-gray-100 gap-2 items-center focus:outline-none font-medium rounded-lg text-[12px] lg:text-[15px] px-4 py-2 text-center"
                          >
                            My Reviews
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={() => handleLogout()}
                        type="button"
                        className="text-[#464F54] flex gap-2 w-full md:hover:text-Primary hover:bg-gray-100 items-center focus:outline-none font-medium rounded-lg text-[12px] lg:text-[15px] px-4 py-2 text-center"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button type="button"
                  className="text-black flex gap-2 items-center bg-transparent focus:outline-none font-medium rounded-lg text-sm lg:text-[18px] px-4 py-2 text-center">
                  <Link className="flex gap-2 md:hover:text-Primary xsm:text-[18px]" to="/signin">
                    {/* <img src={forwardImg} alt="forwarding" /> */}
                    Login
                  </Link>
                </button>
              )}
              <Link to="/contact">
                <button
                  className="text-white hidden md:block bg-Primary hover:bg-Primary focus:outline-none font-bold rounded-lg text-[16px] md:text-[14px] lg:text-[18px] px-4 py-2 md:px-3 md:py-1 lg:px-4 lg:py-2"
                  type="button">
                  Contact
                </button>
              </Link>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm border rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <img src={menu} alt="menu-icon" />
            </button>
          </div>
          {/* mobile view */}
          <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"
              } w-[100%] bg-white shadow-box-shadow mt-2`}
          >
            <div className="items-center justify-between w-full md:flex md:w-auto"
              id="navbar-cta">
              <ul className="md:hidden flex flex-col text-sm p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-[#464F54] dark:border-gray-700">
                <li>
                  <Link to="/" className="block py-2 px-3 md:p-0 text-[#464F54] focus:bg-Primary focus:text-white rounded  md:text-Primary md:dark:text-blue-500 active:text-white"
                  > Home</Link>
                </li>
                <li>
                  <Link to="/business-list" className="block py-2 px-3 md:p-0 text-[#464F54] rounded  md:hover:bg-transparent md:hover:text-Primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-Primary focus:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:bg-Primary active:text-white"
                  > Bussiness List</Link>
                </li>
                {token && <li>
                  <Link to="/user-reviews" className="block py-2 px-3 md:p-0 text-[#464F54] rounded focus:text-white md:hover:bg-transparent md:hover:text-Primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-Primary md:dark:hover:bg-transparent dark:border-gray-700 active:bg-Primary active:text-white"
                  > My Reviews</Link>
                </li>}
                <li>
                  <Link to="/contact" className="block py-2 px-3 md:p-0 text-[#464F54] rounded focus:text-white md:hover:bg-transparent md:hover:text-Primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-Primary md:dark:hover:bg-transparent dark:border-gray-700 active:bg-Primary active:text-white"
                  > Contact</Link>
                </li>
                {token && <li>
                  <Link className="block py-2 px-3 md:p-0 text-[#464F54] rounded focus:text-white md:hover:bg-transparent md:hover:text-Primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white focus:bg-Primary md:dark:hover:bg-transparent dark:border-gray-700 active:bg-Primary active:text-white"
                    onClick={() => handleLogout()}
                  > Logout</Link>
                </li>}
                <li>
                  <div className="relative">
                    <button
                      className=" flex gap-2 items-center py-2 px-3 md:p-0 text-[#464F54] font-medium text-sm lg:text-[18px] rounded  md:hover:bg-transparent md:hover:text-Primary"
                      onClick={() => setIsCatOpen(!isCatOpen)}>
                      Categories
                      <img src={arrow} alt="arrow-icon" className={`w-3 ${isCatOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {isCatOpen && (
                      <div
                      >
                        <div
                          className="absolute left-0 w-56 bg-white rounded-md shadow-box-shadow"
                          onMouseEnter={() => setIsCatOpen(true)}
                          onMouseLeave={() => setIsCatOpen(false)}>
                          {(category?.map((item) => {
                            return (
                              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer md:hover:text-Primary"
                                key={item?.id}
                                to={`/business-list?category=${item?.name}`}
                                onClick={() => window.scrollTo(0, 0)}>{capitalizeWords(item?.name)}<br /></Link>
                            );
                          })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
