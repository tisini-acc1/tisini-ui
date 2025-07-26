import { Outlet, RouteObject } from "react-router-dom";

import LeaguesPage from "@/pages/leagues/Leagues";
import LeaguesLayout from "@/layouts/LeaguesLayout";
import TopScorersPage from "@/pages/leagues/TopScorers";

const LeagueRoutes = {
  path: "/scores/leagues",
  element: (
    <LeaguesLayout>
      <Outlet />
    </LeaguesLayout>
  ),
  children: [
    {
      path: "/scores/leagues/sportpesa-7s",
      element: <LeaguesPage />,
    },
    {
      path: "/scores/leagues/sportpesa-7s/scorers",
      element: <TopScorersPage />,
    },
  ],
} satisfies RouteObject;

export default LeagueRoutes;
