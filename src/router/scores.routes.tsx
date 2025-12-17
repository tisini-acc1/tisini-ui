import type { RouteObject } from "react-router-dom";

import Rugby from "@/pages/scores/Rugby/Rugby";
import ScoresLayout from "@/layouts/ScoresLayout";
import Football from "@/pages/scores/Football/Football";
import BasketBall from "@/pages/scores/Basketball/BasketBall";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import SingleFixture from "@/pages/scores/SingleFixture/SingleFixture";
import LeaguesPage from "@/pages/scores/leagues/Leagues";

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
      path: "/scores/basketball",
      element: <BasketBall />,
      // loader: HomepageDataLoader,
      // errorElement: <HomepageError />,
    },
    {
      path: "/scores/football/:fixtureId",
      element: <SingleFixture />,
    },
    {
      path: "/scores/rugby/:fixtureId",
      element: <SingleFixture />,
    },
    {
      path: "/scores/basketball/:fixtureId",
      element: <SingleFixture />,
    },
    {
      path: "/scores/leagues/:leagueId",
      element: <LeaguesPage />,
    },
  ],
} satisfies RouteObject;

export default scoresRoutes;
