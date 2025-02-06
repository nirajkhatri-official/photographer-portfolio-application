import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axiosClient from "../../../libs/axiosClient";
import { IAlbum } from "../../types/album-type";
import { apiEndpoints } from "../../../config/apiEndpoints";

const getMyAlbums = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [_, id] = queryKey;
  return axiosClient<{ data: IAlbum[] }>(apiEndpoints.MY_ALBUM(id));
};

export const useGetMyAlbums = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["my-albums", id],
    queryFn: getMyAlbums,
    select: (data) => {
      return data?.data;
    },
  });
};
