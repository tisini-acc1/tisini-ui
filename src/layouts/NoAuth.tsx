import {
  Navigate,
  useLocation,
} from "react-router-dom";

import React from "react";
import useAuth from "@/hooks/useAuth";

type NoAuthProps = {
  children: React.ReactNode;
};

export const NoAuth = ({ children }: NoAuthProps) => {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  //   const currentUrl = useLocation().pathname;
  const { auth } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const from = useLocation().state?.from ?? ("/" as string);
  const _redirect = decodeURIComponent(from as string);
  return auth.isAuthenticated ? <Navigate to={_redirect} replace /> : children;
};
