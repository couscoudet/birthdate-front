import axios, { AxiosInstance } from "axios";

export const useApi = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-control-Allow-Origin": "*",
    Authorization: "Bearer xyz",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ENV_BASE_URL,
    headers,
  });

  return api;
};
