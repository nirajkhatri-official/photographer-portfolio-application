import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../libs/axiosClient";
import { IGetAllAlbumResponse } from "../../types/album-type";
import { apiEndpoints } from "../../../config/apiEndpoints";

interface IGetAllAlbums {
  data: IGetAllAlbumResponse;
}

const getAllAlbums = () => {
  return axiosClient<IGetAllAlbums>(apiEndpoints.ALBUMS);
};

export const useGetAllAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: getAllAlbums,
    select: (data) => data?.data,
  });
};
