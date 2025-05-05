
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Star, BarChartHorizontal, Library, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleSuccess = (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    fetch("http://localhost:5259/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User info:", data);
        // Optionnel : stocker utilisateur, rediriger, etc.
      });
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <aside
      className={cn(
        "bg-secondary/50 backdrop-blur-lg border-r border-border fixed h-screen flex flex-col transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h1
          className={cn(
            "font-bold text-xl transition-opacity",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          Groove Galaxy
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Music /> : <Music />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem
          to="/musiques"
          icon={Library}
          label="Musiques"
          collapsed={collapsed}
          active={
            location.pathname.includes("/musiques") ||
            location.pathname === "/" ||
            location.pathname.includes("/track/")
          }
        />
        <SidebarItem
          to="/analyse"
          icon={BarChartHorizontal}
          label="Analyse"
          collapsed={collapsed}
          active={location.pathname.includes("/analyse")}
        />
        <SidebarItem
          to="/statistics"
          icon={PieChart}
          label="Statistiques"
          collapsed={collapsed}
          active={location.pathname.includes("/statistics")}
        />
        <SidebarItem
          to="/playlists"
          icon={Headphones}
          label="Playlists"
          collapsed={collapsed}
          active={location.pathname.includes("/playlists")}
        />
        <SidebarItem
          to="/favoris"
          icon={Star}
          label="Favoris"
          collapsed={collapsed}
          active={location.pathname.includes("/favoris")}
        />
      </nav>

      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-start")}>
          <div className={cn(
            "rounded-md overflow-hidden",
            collapsed ? "w-10 h-10" : "w-full"
          )}>
            <div 
              
            >
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                size={collapsed ? "small" : "medium"}
                theme="outline"
                useOneTap
                type={collapsed ? "icon" : "standard"}
                shape="pill"
                logo_alignment="center"
                text={collapsed ? "signin" : "signin"}
                context={collapsed ? "signin" : "signin"}
                width={collapsed ? "40px" : "100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active, collapsed }: SidebarItemProps) => {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        active ? "bg-primary/10 hover:bg-primary/15" : ""
      )}
      asChild
    >
      <Link to={to}>
        <Icon className="mr-2" />
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  );
};

export default Sidebar;
