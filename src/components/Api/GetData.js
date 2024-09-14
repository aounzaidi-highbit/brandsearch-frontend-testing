import axios from "axios";

const api = axios.create({ baseURL: "https://myapi.brandsearchengine.com/api/" });

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) {
    console.error("Refresh token not found.");
    window.location.replace("/login");
    return null;
  }

  try {
    const response = await api.post("auth/token/refresh/", {
      refresh_token,
    });
    const { access_token, refresh_token: new_refresh_token } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", new_refresh_token);
    localStorage.setItem("userIsLoggedIn", true);

    console.log("Tokens refreshed and stored in localStorage.");

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error.response || error.message);
    window.location.replace("/login");
    localStorage.clear();
    throw error;
  }
};

const apiRequest = async (method, url, data) => {
  let access_token = localStorage.getItem("access_token");

  try {
    if (access_token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    } else {
      console.error("Access token not found.");
      window.location.replace("/login");
      return;
    }

    const response = await api.request({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.warn("Access token expired, attempting to refresh...");

      try {
        access_token = await refreshToken();

        if (access_token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
          const response = await api.request({
            method,
            url,
            data,
          });

          return response.data;
        } else {
          console.error("Failed to refresh access token.");
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

class GetData {
  constructor() {
    this.state = {
      open: false,
    };
  }

  AllPatientsList = (archivedTable) => {
    const res = async () => {
      const resp = await apiRequest(
        "get",
        `doctors/yang_wen-li/patients?is_archived=${archivedTable}`
      );
      return resp;
    };
    return res();
  };
}

export default new GetData();
