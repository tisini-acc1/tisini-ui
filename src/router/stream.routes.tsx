import { type RouteObject } from "react-router-dom";

import { StreamsLayout } from "@/layouts/StreamsLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SingleStream from "@/pages/streams/SingleStream/SingleStream";
import { LowerThird } from "@/pages/streams/SingleStream/LowerThird";
import { SelectStream } from "@/pages/streams/Stream/SelectStream";
import FootballStream from "@/pages/streams/Stream/FootballStream";
import RugbyStream from "@/pages/streams/Stream/RugbyStream";

const streamRoutes = {
  path: "/streams",
  element: <StreamsLayout />,
  children: [
    {
      path: "/streams",
      element: <SelectStream />,
    },
    {
      path: "/streams/football/:streamName",
      element: <FootballStream />,
    },
    {
      path: "/streams/rugby/:streamName",
      element: <RugbyStream />,
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
