import { type RouteObject } from "react-router-dom";

import Stream from "@/pages/streams/Stream/Stream";
import { StreamsLayout } from "@/layouts/StreamsLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SingleStream from "@/pages/streams/SingleStream/SingleStream";
import { LowerThird } from "@/pages/streams/SingleStream/LowerThird";

const streamRoutes = {
  path: "/streams",
  element: <StreamsLayout />,
  children: [
    {
      path: "/streams",
      element: <Stream />,
    },
    {
      path: "/streams/stats/:fixtureId",
      element: <SingleStream />,
    },
    {
      path: "/streams/lowerthird/:fixtureId",
      element: <LowerThird />,
    },
    {
      path: "*",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default streamRoutes;
