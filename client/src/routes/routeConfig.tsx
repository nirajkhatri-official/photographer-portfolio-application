import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import ROUTE_CONSTANTS from "./ROUTE_CONSTANT";
import SignUp from "../features/auth/routes/SignUp";
import Album from "../features/album/routes/Album";
import NotFound from "./NotFound";
import MainLayout from "../components/layouts/MainLayout";
import MyAlbums from "../features/album/routes/MyAlbums";
import ViewAlbumDetail from "../features/album/routes/ViewAlbumDetail";
import ProtectedRoute from "./ProtectedRoutes";
import ResetPassword from "../features/auth/routes/ResetPassword";

const SignIn = lazy(() => import("../features/auth/routes/SignIn"));

const {
  DEFAULT,
  SIGN_UP,
  ALBUM,
  SIGN_IN,
  NOT_FOUND,
  MY_ALBUMS,
  VIEW_ALBUM_DETAIL,
  VIEW_MY_ALBUM_DETAIL,
  RESET_PASSWORD,
} = ROUTE_CONSTANTS;

export const authRouteConfig = createBrowserRouter([
  {
    element: <ProtectedRoute isAuthRequired={false} redirectPath={DEFAULT} />,
    children: [
      {
        path: SIGN_IN,
        element: <SignIn />,
      },
      {
        path: SIGN_UP,
        element: <SignUp />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <ProtectedRoute isAuthRequired={true} redirectPath={SIGN_IN} />,
    children: [
      {
        path: DEFAULT,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ALBUM} replace />,
          },
          {
            path: ALBUM,
            element: <Album />,
          },
          {
            path: MY_ALBUMS,
            element: <MyAlbums />,
          },
          {
            path: VIEW_ALBUM_DETAIL,
            element: <ViewAlbumDetail />,
          },
          {
            path: VIEW_MY_ALBUM_DETAIL,
            element: <ViewAlbumDetail />,
          },
          {
            path: NOT_FOUND,
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
