import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import useUserStore from "@/store/userStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  
  config.headers = {
    token: token ? `Bearer ${token}` : "",
    "Content-Type": config.headers["Content-Type"] || "application/json",
  };
  const method = config.method?.toUpperCase();

  return config;
});

axiosInstance.interceptors.response.use(
  (response : any) => {
    const {
      config: { method, url },
      data,
    } = response;
    return response;
  },
  (error) => {
    const {
      config: { method, url },
      data,
    } = error.response;

    if (["Token is not valid!"].includes(data)) {
      localStorage.removeItem("token");
      useUserStore.setState({
        user: undefined,
      });
    }

    return Promise.reject(data);
  }
);
