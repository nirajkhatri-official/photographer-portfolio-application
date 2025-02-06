import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../libs/axiosClient";
import queryClient from "../../../libs/queryClient";
import { apiEndpoints } from "../../../config/apiEndpoints";
import { IDeleteAlbumResponse } from "../../types/album-type";

const deleteAlbum = (id: string) =>
  axiosClient.delete<IDeleteAlbumResponse>(apiEndpoints.ALBUM_BY_ID(id));

export const useDeleteAlbum = () => {
  return useMutation({
    mutationFn: deleteAlbum,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["albums", data?.data?.id]);
    },
    onError: (error: any) => {
      console.log(error, "error");
    },
  });
};
