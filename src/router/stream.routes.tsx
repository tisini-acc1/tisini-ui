import { Outlet, type RouteObject } from "react-router-dom";

import Stream from "@/pages/streams/Stream/Stream";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SingleStream from "@/pages/streams/SingleStream/SingleStream";

const streamRoutes = {
  path: "/streams",
  element: <Outlet />,
  children: [
    {
      path: "/streams",
      element: <Stream />,
    },
    {
      path: "/streams/:tournament",
      element: <SingleStream />,
    },
    {
      path: "*",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default streamRoutes;
