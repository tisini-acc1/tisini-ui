import Homepage from "@/pages/Homepage/Homepage";
// import HomepageDataLoader from "@/pages/Homepage/HomepageDataLoader";
import HomepageError from "@/pages/Homepage/HomepageError";
import type { RouteObject } from "react-router-dom";

const baseRoutes = [
  {
    path: "/",
    element: <Homepage />,
    // loader: HomepageDataLoader,
    errorElement: <HomepageError />,
  },
] satisfies RouteObject[];

export default baseRoutes;
