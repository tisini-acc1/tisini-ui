import { NoAuth } from "@/layouts/NoAuth";
import Loginpage from "@/pages/Login/Loginpage";
import RegisterPage from "@/pages/Register/RegisterPage";
import AppAuth from "@/pages/auth/AppAuth";
import { Outlet, type RouteObject } from "react-router-dom";

const authRoutes = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "/auth/login",
      element: (
        <NoAuth>
          <AppAuth />
        </NoAuth>
      ),
    },
    // {
    //   path: "/auth/register",
    //   element: <RegisterPage />,
    // },
  ],
} satisfies RouteObject;

export default authRoutes;
