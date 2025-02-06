import { useMutation } from "@tanstack/react-query";
import { axiosClientPost } from "../../../libs/axiosClient";
import {
  ISignInError,
  ISignInRequest,
  ISignInResponse,
} from "../../types/auth-type";
import { AxiosError } from "axios";
import { apiEndpoints } from "../../../config/apiEndpoints";

const getUserToken = async (data: ISignInRequest) => {
  return axiosClientPost<ISignInResponse>(apiEndpoints.SIGN_IN, data);
};

const useSignIn = () => {
  return useMutation<
    ISignInResponse,
    AxiosError<ISignInError>,
    ISignInRequest,
    unknown
  >({
    mutationFn: getUserToken,
  });
};
export default useSignIn;
