import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
