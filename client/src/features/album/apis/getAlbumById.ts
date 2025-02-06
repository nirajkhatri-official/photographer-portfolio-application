import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axiosClient from "../../../libs/axiosClient";
import { apiEndpoints } from "../../../config/apiEndpoints";
import { IAlbum } from "../../types/album-type";

const getAlbumById = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;
  return axiosClient<{
    data: IAlbum;
  }>(apiEndpoints.ALBUM_BY_ID(id));
};

interface IGetAlbumById {
  id: string;
}

export const useGetAlbumById = ({ id }: IGetAlbumById) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["album", id],
    queryFn: getAlbumById,
    select: (data) => {
      return data.data!;
    },
  });
};
