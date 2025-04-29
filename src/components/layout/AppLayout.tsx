
import React from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className={cn("flex-1 p-6 md:p-10", className)}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
