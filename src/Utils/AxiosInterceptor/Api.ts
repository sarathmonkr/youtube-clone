import axios from "axios";

console.log('base',import.meta.env.VITE_BASE_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
 
API.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response: any) => response,
  (error: { response: { status: number; }; }) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error
    }
    return Promise.reject(error);
  }
);

export default API;
