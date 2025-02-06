// import useAuthStore from "@src/features/auth/store/useAuthStore";
import axios, { AxiosError } from "axios";
import useAuthStore from "../features/auth/store/useAuthStore";
// import { handleAuthentication } from "./authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error: AxiosError) {
    if (error.response?.status == 401) {
      return useAuthStore.setState({
        isUserLoggedIn: false,
      });
    }

    return Promise.reject(error);
  }
);

export async function axiosClientPost<T>(url: string, data: any): Promise<T> {
  const response = await axiosClient.post<T>(url, data);
  return response.data;
}

export default axiosClient;
