import LeaguesLayout from "@/layouts/LeaguesLayout";
import LeaguesPage from "@/pages/leagues/Leagues";
import { Outlet, RouteObject } from "react-router-dom";

const LeagueRoutes = {
  path: "/scores/leagues",
  element: <Outlet />,
  children: [
    {
      path: "/scores/leagues/sportpesa-7s",
      element: (
        <LeaguesLayout>
          <LeaguesPage />
        </LeaguesLayout>
      ),
    },
  ],
} satisfies RouteObject;

export default LeagueRoutes;
