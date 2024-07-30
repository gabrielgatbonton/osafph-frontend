import axios from "axios";
import { auth } from "@/utils/auth";

//Initialize Backend URL
const baseURL = process.env.VUE_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}api/`, //Axios baseURL
});

axiosInstance.interceptors.request.use((config) => {
  if (auth.token()) {
    config.headers.Authorization = `Bearer ${auth.token()}`;
  }
  return config;
});

export default axiosInstance;

