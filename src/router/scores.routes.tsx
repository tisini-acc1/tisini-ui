import type { RouteObject } from "react-router-dom";

import Rugby from "@/pages/Rugby/Rugby";
import Football from "@/pages/Football/Football";
import ScoresLayout from "@/layouts/ScoresLayout";
import SingleRugby from "@/pages/SingleFixture/SingleRugby";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import SingleFootball from "@/pages/SingleFixture/SingleFootball";

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
