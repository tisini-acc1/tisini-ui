import Homepage from "@/pages/Homepage/Homepage";
import type { RouteObject } from "react-router-dom";

const baseRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
] satisfies RouteObject[];

export default baseRoutes;
