import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import HeroSection from "./Home/HeroSection";
import PopularCategories from "./Home/PopularCategories";
import FeaturedListings from "./Home/FeaturedListings";
import OurListed from "./Home/OurListed";
import Contact from "./Contact";
import Policy from "./Policy";
import Faqs from "./Faqs";
import SignUp from "./SignUp";
import ErrorPage from "./ErrorPage";
import BusinessDetails from "./BusinessDetails/BusinessDetails";
import BusinessList from "./BusinessDetails/BusinessList";
import { SignIn } from "./SignIn";
import About from "./About/About";
import BlogsSection from "./Home/BlogsSection";
import UserLog from "./Home/UserLog";
import DynamicTitle from "./DynamicTitle";
import useAuth from '../middlewares/useAuth';


export default function MainComponent() {
  const isAuthenticated = useAuth();
  return (
    <>
      <DynamicTitle />
      <Routes>
        <Route
          index
          element={
            <>
              <HeroSection />
              <PopularCategories />
              <OurListed />
              <UserLog />
              <FeaturedListings />
              <BlogsSection />
            </>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="policy" element={<Policy />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="about" element={<About />} />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="review/:name/:bussiness" element={<BusinessDetails />} />
        <Route path="business-list" element={<BusinessList />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}