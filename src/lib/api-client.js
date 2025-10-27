import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally add interceptors (for auth, logging, etc.)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Network or server error. Please try again later.";
    return Promise.reject({ success: false, message });
  }
);

// A generic API client
export const apiClient = {
  get(endpoint, config) {
    return axiosInstance.get(endpoint, config);
  },
  post(endpoint, data, config) {
    return axiosInstance.post(endpoint, data, config);
  },
  put(endpoint, data, config) {
    return axiosInstance.put(endpoint, data, config);
  },
  delete(endpoint, config) {
    return axiosInstance.delete(endpoint, config);
  },
};
