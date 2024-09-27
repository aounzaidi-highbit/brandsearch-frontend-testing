import { HTTP_CLIENT } from "../utils/axiosClient";

const getAllProfiles = async (category, page, itemsPerPage, name, rating, ordering) => {
  return await HTTP_CLIENT.get(
    `/api/profile/?category=${category || ""}&page=${page || ""}&page_size=${itemsPerPage || ""}&name=${name || ""}&rating=${rating || ""}&ordering=${ordering || ""}`
  );
};

const getSearchProfile = async (name) => {
  return await HTTP_CLIENT.get(`/api/profile/?search=${name || ""}`);
};

const getSingleProfiles = async (id) => {
  return await HTTP_CLIENT.get(`/api/profile/${id}`);
};

const getUserReviews = async () => {
  return await HTTP_CLIENT.get(`/api/rating/my_ratings/`);
};

const addReview = async (id) => {
  return await HTTP_CLIENT.post("/api/rating/", id);
};

const reviewGet = async (params) => {
  return await HTTP_CLIENT.get(`/api/rating/brand/${params}/`);
};

const getRatingDetails = async (brandId) => {
  const response = await reviewGet(brandId);
  return response.data;
};

const getAllCategories = async () => {
  return await HTTP_CLIENT.get("/api/category");
};

const deleteUserReview = async (reviewId) => {
  return await HTTP_CLIENT.delete(`/api/rating/${reviewId}/`);
};

const editReview = async (id, updatedData) => {
  return await HTTP_CLIENT.patch(`/api/rating/${id}/`, updatedData);
};

const verifyOtp = async (email, otp) => {
  return await HTTP_CLIENT.post(`/api/auth/otp-verify/`, { email, otp });
};

const contact = async (data) => {
  return await HTTP_CLIENT.post("/api/contact_us/", data);
};

const signIn = async (email, password) => {
  return await HTTP_CLIENT.post("/api/auth/login/", { email, password });
};

const signUp = async (formData) => {
  return await HTTP_CLIENT.post("/api/auth/login/", formData);
};

export { getAllProfiles, getSingleProfiles, addReview, reviewGet, getRatingDetails, getAllCategories, getSearchProfile, getUserReviews, deleteUserReview, editReview, verifyOtp, signIn, signUp, contact };