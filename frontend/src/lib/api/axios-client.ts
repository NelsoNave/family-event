import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/";

export const axiosInstance = axios.create({
  baseURL,
});

// Custom hook to use auth token
export const useAuthAxios = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Cleanup
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return axiosInstance;
};

// Public axios instance
export const publicAxios = axios.create({
  baseURL,
});
