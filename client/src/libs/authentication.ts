import { AxiosError } from "axios";
import useAuthStore from "../features/auth/store/useAuthStore";
import { axiosClientPost } from "./axiosClient";

const getRefreshToken = () => useAuthStore.getState()?.userInfo?.refresh;

export const handleAuthentication = (error: AxiosError) => {
  const refreshToken = getRefreshToken();

  const originalRequest = error.config;

  if (originalRequest?.url?.includes("google")) {
    return Promise.reject(error);
  }

  if (originalRequest?.url?.includes("refresh")) {
    return useAuthStore.setState({
      isUserLoggedIn: false,
      userInfo: null,
    });
  }

  axiosClientPost("token/refresh/", {
    refresh: refreshToken,
  })
    .then((res: any) => {
      if (res.access) {
        useAuthStore.setState((state) => ({
          ...state,
          userInfo: {
            ...state.userInfo!,
            access: res.access,
          },
        }));
      }
    })
    .catch((err: AxiosError) => Promise.reject(err));

  if (originalRequest?.method === "get") {
    return Promise.reject(error);
  }
};
