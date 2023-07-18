import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { useAppSelector } from "@/store/hooks";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { auth } = useAppSelector((state) => state.persist);
  //   React.useEffect(() => {
  //     if (!auth) {
  //       window.location.href = "/login";
  //     }
  //   }, [auth]);
  const currentUrl = useLocation().pathname;
  const encodedUrl = encodeURIComponent(currentUrl);
  const loginUrl = `/auth/login?_redirect=${encodedUrl}`;

  return auth.isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={loginUrl}
      state={{
        from: encodedUrl,
      }}
      replace
    />
  );
}
