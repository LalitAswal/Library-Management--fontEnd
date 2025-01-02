import axios from "axios";
import { BASE_URL } from "../constant/environment.js";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosClient;
