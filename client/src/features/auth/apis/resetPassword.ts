import { useMutation } from "@tanstack/react-query";
import { axiosClientPost } from "../../../libs/axiosClient";
import {
  IResetPasswordRequest,
  IResetPasswordResponse,
} from "../../types/auth-type";
import { apiEndpoints } from "../../../config/apiEndpoints";

const resetPassword = async (data: IResetPasswordRequest) => {
  return axiosClientPost<IResetPasswordResponse>(
    apiEndpoints.RESET_PASSWORD,
    data
  );
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
export default useResetPassword;
