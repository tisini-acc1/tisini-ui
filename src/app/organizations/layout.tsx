"use client";

import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import { ProtectedRoute } from "../storage/providers/AuthProvider";
import { Unna } from "next/font/google";

// Variable for the font
const pUnna = Unna({ weight: "400", subsets: ["latin"] });
/**
 * Meta data for the app
 */
// export const metadata = {
//   title: "Organization",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className={pUnna.className}>
        <MainHeader />
        {children}
        <MainFooter />
      </div>
    </ProtectedRoute>
  );
}