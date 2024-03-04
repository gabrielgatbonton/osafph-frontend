import axios from "axios";
import store from "../store";

//Initialize Backend URL
const baseURL = process.env.VUE_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}api/`, //Axios baseURL
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getters["login/accessToken"];
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;

