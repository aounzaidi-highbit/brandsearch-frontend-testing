import axios from "axios";

export const HTTP_CLIENT = axios.create({
  baseURL: "http://192.168.100.163:8000/",
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
