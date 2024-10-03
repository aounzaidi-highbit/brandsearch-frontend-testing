import axios from "axios";

export const HTTP_CLIENT = axios.create({
  baseURL: "https://myapi.brandsearchengine.com/",
});

export const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem("access_token");

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      } else {
        delete config.headers.Authorization;
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};
