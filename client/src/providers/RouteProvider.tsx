import { RouterProvider } from "react-router-dom";
import { authRouteConfig } from "../routes/routeConfig";

function RouteProvider() {
  return <RouterProvider router={authRouteConfig} />;
}

export default RouteProvider;
