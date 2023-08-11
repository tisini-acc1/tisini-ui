import Notfound404 from "@/pages/Notfoud404/Notfound404";
import type { RouteObject } from "react-router-dom";
import articlesRoutes from "./articles.routes";
import authRoutes from "./auth.routes";
import baseRoutes from "./base.routes";
import { createBrowserRouter } from "react-router-dom";
import organizationRoutes from "./org.routes";
import BaseErrorPage from "@/components/errors/BaseErrorPage";

const routes = [
  {
    path: "/",
    errorElement: <BaseErrorPage />,
    children: [...baseRoutes, authRoutes, organizationRoutes, articlesRoutes],
  },
  {
    path: "*",
    element: <Notfound404 />,
  },
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
