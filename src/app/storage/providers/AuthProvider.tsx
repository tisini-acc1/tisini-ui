'use client'

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

type ProtectedProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedProps) {
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();
  React.useEffect(() => {
    console.log("ProtectedRoute", session);
    if (session.status === "unauthenticated") {
      const currentUrlEncoded = encodeURIComponent(pathName);
      router.push(`/login?callbackUrl=${currentUrlEncoded}`);
    }
  }, [pathName, router, session, session.status]);
  return <>{children}</>;
}
