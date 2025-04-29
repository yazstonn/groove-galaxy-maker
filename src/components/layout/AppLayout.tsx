
import React from "react";
import Sidebar from "./Sidebar";
import PlatformWrapper from "./PlatformWrapper";
import { cn } from "@/lib/utils";
import useAppEnvironment from "../../hooks/useAppEnvironment";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  const { isElectron } = useAppEnvironment();
  
  return (
    <PlatformWrapper>
      <div className={cn(
        "flex min-h-screen w-full",
        isElectron && "electron-container"
      )}>
        <Sidebar />
        <main className={cn("flex-1 p-6 md:p-10", className)}>
          {children}
        </main>
      </div>
    </PlatformWrapper>
  );
};

export default AppLayout;
