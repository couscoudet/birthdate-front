import axios, { AxiosInstance } from "axios";

export const useApi = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-control-Allow-Origin": "*",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ENV_BASE_URL,
    headers,
  });

  api.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 403) {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
        }

        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const headers = { Authorization: "Bearer " + refreshToken };
            const result = await axios.get(
              import.meta.env.VITE_ENV_BASE_URL + "/refreshToken",
              { headers }
            );
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("refreshToken", result.data.refreshToken);

            originalRequest.headers["Authorization"] =
              "Bearer " + result.data.token;
            return axios(originalRequest);
          } catch (error) {
            localStorage.clear();
          }
        } else {
          localStorage.clear();
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};
