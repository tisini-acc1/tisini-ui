import type { RouteObject } from "react-router-dom";
import authRoutes from "./auth.routes";
import baseRoutes from "./base.routes";
import { createHashRouter } from "react-router-dom";
import organizationRoutes from "./org.routes";

const routes = [...baseRoutes, authRoutes, organizationRoutes] as RouteObject[];

const router = createHashRouter(routes);

export default router;
