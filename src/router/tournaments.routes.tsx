import { Outlet, type RouteObject } from "react-router-dom";

import BaseLayout from "@/layouts/BaseLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import Tournaments from "@/pages/tournaments/Tournament/Tournaments";
import SingleTournament from "@/pages/tournaments/SingleTournament/SingleTournament";

const tournamentRoutes = {
  path: "/tournaments",
  element: <Outlet />,
  children: [
    {
      path: "/tournaments",
      element: (
        <BaseLayout>
          <Tournaments />
        </BaseLayout>
      ),
    },
    {
      path: "/tournaments/:tournament",
      element: <SingleTournament />,
    },
    {
      path: "*",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default tournamentRoutes;
