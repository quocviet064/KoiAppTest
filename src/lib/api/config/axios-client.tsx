import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "https://localhost:7166";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor with TypeScript
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = sessionStorage.getItem("token");

    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = "application/json";
      }
    }
    
    if (config.headers && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor with TypeScript
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
