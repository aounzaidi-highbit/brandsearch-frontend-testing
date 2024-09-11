import { HTTP_CLIENT } from "../utils/axiosClient";

const getAllProfiles = async (category, page, itemsPerPage, name) => {
  return await HTTP_CLIENT.get(
    `/api/profile/?category=${category || ""}&page=${page || ""}&page_size=${itemsPerPage || ""}&name=${name || ""}`
  );
};

const getSingleProfiles = async (id) => {
  return await HTTP_CLIENT.get(`/api/profile/${id}`);
};

const addReview = async (params) => {
  return await HTTP_CLIENT.post("/api/rating/", params);
};

const reviewGet = async (params) => {
  return await HTTP_CLIENT.get(`/api/rating/${params}/`);
};

const getRatingDetails = async (brandId) => {
  const response = await reviewGet(brandId);
  return response.data; // Return the rating details
};

export { getAllProfiles, getSingleProfiles, addReview, reviewGet, getRatingDetails };