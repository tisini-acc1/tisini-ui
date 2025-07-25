import LeaguesLayout from "@/layouts/LeaguesLayout";
import LeaguesPage from "@/pages/leagues/Leagues";
import TopScorersPage from "@/pages/leagues/TopScorers";
import { Outlet, RouteObject } from "react-router-dom";

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
