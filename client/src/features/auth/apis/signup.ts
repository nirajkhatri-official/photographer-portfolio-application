import { useMutation } from "@tanstack/react-query";
import { axiosClientPost } from "../../../libs/axiosClient";
import useAuthStore from "../store/useAuthStore";
import { apiEndpoints } from "../../../config/apiEndpoints";

const registerUser = async (data: any) => {
  return axiosClientPost<any>(apiEndpoints.SIGN_UP, data);
};

const useSignUp = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      useAuthStore.getState().handleUserLogin(data);
      // const successMessage = "Logged In Successfully";
    },
  });
};
export default useSignUp;
