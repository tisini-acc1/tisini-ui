"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider session={null} refetchInterval={0}>
      {children}
    </SessionProvider>
  );
}

type ProtectedProps = {
  children: React.ReactNode|JSX.Element
  roles?: string[];
};

export function ProtectedRoute({ children, roles }: ProtectedProps) {
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const currentUrlEncoded = encodeURIComponent(pathName);
  console.log(session);
  return session.status === "unauthenticated" ? (
    router.push(`/login?callbackUrl=${currentUrlEncoded}`)
  ) : session.status === "loading" ? (
    <div>Loading</div>
  ) : session.status === "authenticated" ? (
    <div>{children}</div>
  ) : (
    <div>Unknown</div>
  );
}
