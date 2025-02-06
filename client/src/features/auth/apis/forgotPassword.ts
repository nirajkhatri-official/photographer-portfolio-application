import { useMutation } from "@tanstack/react-query";
import { axiosClientPost } from "../../../libs/axiosClient";
import {
  IForgotPasswordRequest,
  IForotPasswordResponse,
} from "../../types/auth-type";
import { apiEndpoints } from "../../../config/apiEndpoints";
import useToast from "../../../hooks/useToast";

const forgetPassword = async (data: IForgotPasswordRequest) => {
  return axiosClientPost<IForotPasswordResponse>(
    apiEndpoints.FORGET_PASSWORD,
    data
  );
};

const useForgotPassword = () => {
  const { successToast } = useToast();
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => successToast(data?.message),
  });
};
export default useForgotPassword;
