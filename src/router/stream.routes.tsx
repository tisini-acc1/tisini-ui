import { type RouteObject } from "react-router-dom";

import Stream from "@/pages/streams/Stream/Stream";
import { StreamsLayout } from "@/layouts/StreamsLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SingleStream from "@/pages/streams/SingleStream/SingleStream";
import { LowerThird } from "@/pages/streams/SingleStream/LowerThird";
import { SelectStream } from "@/pages/streams/Stream/SelectStream";

const streamRoutes = {
  path: "/streams",
  element: <StreamsLayout />,
  children: [
    {
      path: "/streams",
      element: <SelectStream />,
    },
    {
      path: "/streams/:streamName",
      element: <Stream />,
    },
    {
      path: "/streams/:streamName/stats/:fixtureId",
      element: <SingleStream />,
    },
    {
      path: "/streams/:streamName/lowerthird/:fixtureId",
      element: <LowerThird />,
    },
    {
      path: "*",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default streamRoutes;
