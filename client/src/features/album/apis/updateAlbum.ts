import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../libs/axiosClient";
import queryClient from "../../../libs/queryClient";
import { apiEndpoints } from "../../../config/apiEndpoints";
import { IAlbum, IUpdateAlbumResponse } from "../../types/album-type";
import useToast from "../../../hooks/useToast";

interface IUpdateAlbum {
  id: string;
  data: IAlbum;
}

const updateAlbum = (updateData: IUpdateAlbum) => {
  const { id, data } = updateData;
  return axiosClient.put<IUpdateAlbumResponse>(
    apiEndpoints.ALBUM_BY_ID(id),
    data
  );
};

export const useUpdateAlbum = () => {
  const { successToast } = useToast();
  return useMutation({
    mutationKey: ["update-subscription-charge"],
    mutationFn: updateAlbum,
    onSuccess: (data) => {
      successToast(data?.data?.message);
      queryClient.invalidateQueries(["my-albums"]);
    },
    onError: (error: any) => {
      console.log(error, "error-adding-subscription");
    },
  });
};
