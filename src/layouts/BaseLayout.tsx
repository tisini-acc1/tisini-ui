import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import React from "react";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
