
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-secondary/50 backdrop-blur-lg border-r border-border h-screen flex flex-col transition-all duration-300",
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

      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem icon={Music} label="Reconnaissance" active collapsed={collapsed} />
        <SidebarItem icon={Headphones} label="Mes Playlists" collapsed={collapsed} />
        <SidebarItem icon={Star} label="Favoris" collapsed={collapsed} />
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-medium">U</span>
          </div>
          {!collapsed && <span className="font-medium">Utilisateur</span>}
        </div>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, collapsed }: SidebarItemProps) => {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start", 
        active ? "bg-primary/10 hover:bg-primary/15" : ""
      )}
    >
      <Icon className="mr-2" />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
};

export default Sidebar;
