import Axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const token = JSON.parse(
      localStorage.getItem("artist_access_token") as string,
    );
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
  }

  return config;
}

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log("error message", message);

    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
