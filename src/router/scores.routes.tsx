import type { RouteObject } from "react-router-dom";

import Football from "@/pages/scores/Football/Football";
import ScoresLayout from "@/layouts/ScoresLayout";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import Rugby from "@/pages/scores/Rugby/Rugby";
import SingleFootball from "@/pages/scores/SingleFixture/SingleFootball";
import SingleRugby from "@/pages/scores/SingleFixture/SingleRugby";

const scoresRoutes = {
  path: "/scores",
  element: (
    <ThemeProviderWrapper>
      <ScoresLayout />
    </ThemeProviderWrapper>
  ),
  children: [
    {
      path: "/scores",
      element: <Football />,
      // loader: HomepageDataLoader,
      // errorElement: <HomepageError />,
    },
    {
      path: "/scores/rugby",
      element: <Rugby />,
      // loader: HomepageDataLoader,
      // errorElement: <HomepageError />,
    },
    {
      path: "/scores/football/:fixtureId",
      element: <SingleFootball />,
    },
    {
      path: "/scores/rugby/:fixtureId",
      element: <SingleRugby />,
    },
  ],
} satisfies RouteObject;

export default scoresRoutes;
