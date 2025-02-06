export interface IAlbum {
  category: string;
  createdAt: string;
  description?: string;
  id: string;
  photos: string[];
  title: string;
  updatedAt: string;
  userId: string;
}
export type IGetAllAlbumResponse = IAlbum[];

export interface ICreateAlbumResponse {
  success: boolean;
  message: string;
  data: IAlbum;
}

export interface IUpdateAlbumResponse {
  success: boolean;
  message: string;
  data: IAlbum;
}

export interface IDeleteAlbumResponse {
  success: boolean;
  message: string;
  id: string;
}
