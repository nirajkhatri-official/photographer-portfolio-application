import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import useAuthStore from "../store/useAuthStore";
import axiosClient from "../../../libs/axiosClient";
import { ILogoutResponseDTO } from "../../types/auth-type";
import useToast from "../../../hooks/useToast";
import { apiEndpoints } from "../../../config/apiEndpoints";

const logoutUser = () => {
  return axiosClient.post<ILogoutResponseDTO>(apiEndpoints.LOGOUT);
};

export const useLogoutUser = () => {
  const { errorToast, successToast } = useToast();
  const { handleUserLogout } = useAuthStore();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      handleUserLogout();
      successToast(data?.data?.message);
    },
    onError: (error: AxiosError<any>) => {
      errorToast("Error logging out user");
      console.log(error.response?.data, "error-adding-customer");
    },
  });
};
