import { useMutation } from "@tanstack/react-query";
import { axiosClientPost } from "../../../libs/axiosClient";
import queryClient from "../../../libs/queryClient";
import { ICreateAlbumResponse } from "../../types/album-type";
import useToast from "../../../hooks/useToast";
import { apiEndpoints } from "../../../config/apiEndpoints";

const createAlbum = (data: any) => {
  return axiosClientPost<ICreateAlbumResponse>(apiEndpoints.ALBUMS, data);
};

export const useCreateAlbum = () => {
  const { successToast } = useToast();
  return useMutation({
    mutationFn: createAlbum,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["albums"]);
      successToast(data?.message);
    },
  });
};
