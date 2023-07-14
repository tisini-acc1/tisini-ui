import Loginpage from "@/pages/Login/Loginpage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { Outlet, type RouteObject } from "react-router-dom";

const authRoutes = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "/auth/login",
      element: <Loginpage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
    },
  ],
} satisfies RouteObject;

export default authRoutes;
