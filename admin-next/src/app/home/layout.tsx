import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/home/components/AppSideBar";
import React from "react";

const HomeLayoutTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen px-4">{children}</main>
    </SidebarProvider>
  );
};

export default HomeLayoutTemplate;
