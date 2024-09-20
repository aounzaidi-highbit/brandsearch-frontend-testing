import { HTTP_CLIENT } from "../utils/axiosClient";

const getAllProfiles = async (category, page, itemsPerPage, name) => {
  return await HTTP_CLIENT.get(
    `/api/profile/?category=${category || ""}&page=${page || ""}&page_size=${itemsPerPage || ""}&name=${name || ""}`
  );
};
const getSearchProfile = async (name) => {
  return await HTTP_CLIENT.get(
    `/api/profile/?search=${name || ""}`
  );
};

const getSingleProfiles = async (id) => {
  return await HTTP_CLIENT.get(`/api/profile/${id}`);
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

const getUserReviews = async () => {
  return await HTTP_CLIENT.get(`/api/rating/my_ratings/`);
};

const deleteUserReview = async (reviewId) => {
  return await HTTP_CLIENT.delete(`/api/rating/${reviewId}/`);
};

const editReview = async (id, updatedData) => {
  return await HTTP_CLIENT.put(`/api/rating/${id}/`, updatedData);
};

export { getAllProfiles, getSingleProfiles, addReview, reviewGet, getRatingDetails, getAllCategories, getSearchProfile, getUserReviews, deleteUserReview, editReview };