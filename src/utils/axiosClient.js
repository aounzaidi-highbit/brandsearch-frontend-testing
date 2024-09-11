import axios from "axios";
import defaultConfig from "./config";

export const HTTP_CLIENT = axios.create({
  baseURL: defaultConfig.Base_URL,
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
