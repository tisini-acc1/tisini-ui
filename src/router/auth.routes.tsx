import { NoAuth } from "@/layouts/NoAuth";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
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
    {
      // ForgotPassword
      path: "/auth/forgot-password",
      element: (
        <NoAuth>
          <ForgotPassword />
        </NoAuth>
      ),
    }
    // {
    //   path: "/auth/register",
    //   element: <RegisterPage />,
    // },
  ],
} satisfies RouteObject;

export default authRoutes;
